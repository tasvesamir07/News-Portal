// Changed all 'import' statements to 'require'
const { scrapeArticleLinks } = require("./linkScraper");
const { extractArticleWithDiffbot } = require("./diffbotHelper");
// This is the new, updated code
const { rewriteArticleWithOpenAI } = require("./openaiHelper"); // Use the new helper
const News = require("../models/News");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sources = [
  { url: "https://www.prothomalo.com/bangladesh", category: "বাংলাদেশ" },
  { url: "https://www.prothomalo.com/business", category: "বাণিজ্য" },
  { url: "https://www.prothomalo.com/sports", category: "খেলা" },
  { url: "https://www.prothomalo.com/world", category: "বিশ্ব" },
  { url: "https://www.prothomalo.com/opinion", category: "মতামত" },

  // Kaler Kantho URLs
  // { url: "https://www.kalerkantho.com/list/national/1", category: "বাংলাদেশ" },
  // { url: "https://www.kalerkantho.com/list/business/1", category: "বাণিজ্য" },
  // { url: "https://www.kalerkantho.com/list/sport/1", category: "খেলা" },
  // { url: "https://www.kalerkantho.com/list/world/1", category: "বিশ্ব" },
];

async function runAiExtractionProcess() {
  try {
    console.log("Starting news extraction process...");

    for (const source of sources) {
      console.log(
        `--- Processing category: ${source.category} from ${source.url} ---`
      );

      const articleUrls = await scrapeArticleLinks(source.url);

      for (const articleUrl of articleUrls) {
        const originalArticle = await extractArticleWithDiffbot(articleUrl);

        if (!originalArticle) {
          console.log(
            `Skipping article from ${articleUrl} due to extraction failure.`
          );
          await sleep(13000);
          continue;
        }

        // --- Use Gemini for rewriting ---
        const rewrittenContent = await rewriteArticleWithOpenAI(
          originalArticle.title,
          originalArticle.summary
        );
        const completeArticle = {
          title: rewrittenContent.newTitle,
          summary: rewrittenContent.newSummary,
          image_url: null,
          category: source.category,
          source_url: originalArticle.source_url,
        };

        await News.addNews(completeArticle);
        console.log(
          `Saved (rewritten): ${completeArticle.title} [Category: ${completeArticle.category}]`
        );

        console.log("Waiting for 13 seconds before next Diffbot fetch...");
        await sleep(13000);
      }
    }
    console.log("News extraction process finished successfully.");
  } catch (error) {
    console.error(
      "An error occurred during the news extraction process:",
      error
    );
  }
}

// Changed from 'export' to 'module.exports'
module.exports = { runAiExtractionProcess };
