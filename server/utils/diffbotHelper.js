const axios = require("axios");

async function extractArticleWithDiffbot(articleUrl) {
  const DIFFBOT_API_TOKEN = process.env.DIFFBOT_API_TOKEN;
  if (
    !DIFFBOT_API_TOKEN ||
    DIFFBOT_API_TOKEN === "YOUR_DIFFBOT_API_TOKEN_HERE"
  ) {
    console.error("Diffbot API token is not set in .env file.");
    return null;
  }

  const requestUrl = `https://api.diffbot.com/v3/article`;

  try {
    const response = await axios.get(requestUrl, {
      params: {
        token: DIFFBOT_API_TOKEN,
        url: articleUrl,
      },
    });

    const article = response.data.objects && response.data.objects[0];

    if (!article || !article.title || !article.text) {
      console.error(
        "Diffbot did not return a valid article object for URL:",
        articleUrl
      );
      return null;
    }

    // Diffbot provides the full article 'text'. We create a summary from it.
    const summary =
      article.text.length > 250
        ? article.text.substring(0, 250) + "..."
        : article.text;

    return {
      title: article.title,
      summary: summary, // Using truncated text as the description
      image_url: article.images ? article.images[0].url : null,
      source_url: article.resolvedPageUrl || articleUrl,
    };
  } catch (error) {
    console.error(
      `Error with Diffbot API for ${articleUrl}:`,
      error.response ? error.response.data.error : error.message
    );
    return null;
  }
}

module.exports = { extractArticleWithDiffbot };
