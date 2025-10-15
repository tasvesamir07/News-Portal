const db = require("../db");

async function addNews(article) {
  const { title, summary, image_url, category, source_url } = article;
  const query = `
    INSERT INTO news (title, summary, image_url, category, source_url)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (source_url) DO NOTHING;
  `;
  await db.query(query, [title, summary, image_url, category, source_url]);
}

async function getAllNews() {
  const { rows } = await db.query(
    "SELECT * FROM news ORDER BY created_at DESC"
  );
  return rows;
}

async function getNewsByCategory(category) {
  const { rows } = await db.query(
    "SELECT * FROM news WHERE category = $1 ORDER BY created_at DESC",
    [category]
  );
  return rows;
}

async function getTopNews() {
  const { rows } = await db.query(
    "SELECT id, title FROM news ORDER BY created_at DESC LIMIT 10"
  );
  return rows;
}

module.exports = { addNews, getAllNews, getNewsByCategory, getTopNews };
