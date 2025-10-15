const { runAiExtractionProcess } = require("../utils/aiNewsProcessor");
const News = require("../models/News");

const handleGetAllNews = async (req, res) => {
  try {
    const news = await News.getAllNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleGetNewsByCategory = async (req, res) => {
  try {
    const news = await News.getNewsByCategory(req.params.category);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleGetTopNews = async (req, res) => {
  try {
    const news = await News.getTopNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const handleExtractNow = async (req, res) => {
  // Respond immediately
  res.status(202).json({
    message: "AI extraction process started. This may take a few minutes.",
  });
  // Run the process in the background
  runAiExtractionProcess();
};

module.exports = {
  handleGetAllNews,
  handleGetNewsByCategory,
  handleGetTopNews,
  handleExtractNow, // Renamed for clarity
};
