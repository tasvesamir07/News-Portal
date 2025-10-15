const cron = require("node-cron");
const { runAiExtractionProcess } = require("./utils/aiNewsProcessor");

// Run every 2 hours
const scheduleJob = () => {
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running scheduled AI news extraction job...");
    try {
      await runAiExtractionProcess();
      console.log("Scheduled AI job finished successfully.");
    } catch (error) {
      console.error("Error during scheduled AI job:", error);
    }
  });
};

module.exports = { scheduleJob };
