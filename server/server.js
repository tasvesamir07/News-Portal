console.log("--- Script starting ---");

try {
  const express = require("express");
  const cors = require("cors");
  require("dotenv").config({ path: "../.env" });

  const newsRoutes = require("./routes/newsRoutes");
  const { scheduleJob } = require("./cronJob"); // Updated name
  const { runAiExtractionProcess } = require("./utils/aiNewsProcessor");

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());

  app.use("/api/news", newsRoutes);

  scheduleJob(); // Updated name
  console.log("Cron job scheduled.");

  // Run the process once on startup
  console.log("Calling runAiExtractionProcess() on startup...");
  runAiExtractionProcess();

  app.listen(PORT, () => {
    console.log(`--- Server is running on port ${PORT} ---`);
  });
} catch (error) {
  console.error("\n--- A CRITICAL ERROR OCCURRED DURING STARTUP ---");
  console.error(error);
  console.error("-------------------------------------------------");
}
