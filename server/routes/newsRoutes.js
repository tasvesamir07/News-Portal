const express = require("express");
const router = express.Router();
const {
  handleGetAllNews,
  handleGetNewsByCategory,
  handleGetTopNews,
  handleExtractNow, // Import the new handler
} = require("../controllers/newsController");

router.get("/", handleGetAllNews);
router.get("/top-news", handleGetTopNews);

// Route for manual AI extraction
router.get("/extract-now", handleExtractNow);

router.get("/:category", handleGetNewsByCategory);

module.exports = router;
