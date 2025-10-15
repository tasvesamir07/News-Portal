const puppeteer = require("puppeteer");

// --- THIS IS THE NEW, MORE FORCEFUL SCROLLING FUNCTION ---
async function autoScroll(page) {
  let lastHeight = await page.evaluate("document.body.scrollHeight");

  while (true) {
    // Press the 'End' key to jump to the bottom of the page
    await page.keyboard.press("End");

    // Wait for network requests to finish, which indicates new content has loaded
    try {
      await page.waitForNetworkIdle({ idleTime: 1500, timeout: 5000 });
    } catch (e) {
      // If it times out, it's okay. It usually means all content has loaded.
      console.log("Network idle timeout, proceeding...");
    }

    // Calculate new page height
    let newHeight = await page.evaluate("document.body.scrollHeight");

    // If the page height hasn't changed, we've reached the bottom
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }
}

async function scrapeArticleLinks(categoryPageUrl) {
  let browser = null;
  try {
    console.log(`--- Launching browser to scrape ${categoryPageUrl} ---`);
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(categoryPageUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    console.log("Forcefully scrolling to the bottom of the page...");
    await autoScroll(page);

    // The "process of elimination" logic is still the best way to find the links
    const links = await page.evaluate((url) => {
      const pageHostname = new URL(url).hostname;

      let links = Array.from(document.querySelectorAll("a[href]"));

      document
        .querySelectorAll("header, footer, nav, aside")
        .forEach((junkArea) => {
          junkArea.querySelectorAll("a").forEach((link) => {
            link.setAttribute("data-junk", "true");
          });
        });
      links = links.filter((link) => !link.hasAttribute("data-junk"));

      const articleLinks = links.filter((link) => {
        const href = link.getAttribute("href");
        const text = link.textContent.trim();

        if (!href || href.startsWith("#")) return false;

        const absoluteUrl = new URL(href, url);
        if (absoluteUrl.hostname !== pageHostname) return false;
        if (absoluteUrl.pathname.split("/").filter(Boolean).length < 2)
          return false;

        const wordCount = text.split(/\s+/).length;
        if (wordCount < 3 || wordCount > 25) return false;

        return true;
      });

      const uniqueUrls = new Set(
        articleLinks.map((link) => new URL(link.getAttribute("href"), url).href)
      );
      return Array.from(uniqueUrls);
    }, categoryPageUrl);

    console.log(
      `Found ${links.length} unique article links on ${categoryPageUrl}`
    );
    return links;
  } catch (error) {
    console.error(
      `Error scraping links with Puppeteer from ${categoryPageUrl}:`,
      error.message
    );
    return [];
  } finally {
    if (browser) {
      await browser.close();
      console.log("--- Browser closed ---");
    }
  }
}

module.exports = { scrapeArticleLinks };
