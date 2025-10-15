const OpenAI = require("openai");

async function rewriteArticleWithOpenAI(title, summary) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY || !OPENAI_API_KEY.startsWith("sk-")) {
    console.warn(
      "OpenAI API key is missing or invalid. Returning original content."
    );
    return { newTitle: title, newSummary: summary };
  }

  try {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

    console.log(
      `--- Rewriting content for "${title}" with OpenAI (ChatGPT)... ---`
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }, // Guarantees JSON output
      messages: [
        {
          role: "system",
          content:
            'You are an expert news editor for a Bangla news portal. Your task is to rewrite a news title and summary. Maintain the core meaning but use unique wording in professional Bangla. Provide your response ONLY as a valid JSON object with the keys "newTitle" and "newSummary".',
        },
        {
          role: "user",
          content: `Original Title: ${title}\nOriginal Summary: ${summary}`,
        },
      ],
    });

    const jsonText = response.choices[0].message.content;
    const parsedJson = JSON.parse(jsonText);

    if (parsedJson.newTitle && parsedJson.newSummary) {
      console.log("--- Content successfully rewritten by OpenAI. ---");
      return parsedJson;
    } else {
      throw new Error("OpenAI response did not contain expected JSON keys.");
    }
  } catch (error) {
    console.error(
      "Error rewriting content with OpenAI:",
      error.response ? error.response.data.error : error.message
    );
    // Fallback to original content on error
    return { newTitle: title, newSummary: summary };
  }
}

module.exports = { rewriteArticleWithOpenAI };
