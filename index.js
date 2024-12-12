require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 4000;

// API để ping Cron A
const pingCronA = async () => {
  try {
    await axios.get(process.env.CRON_A_URL);
    console.log(`[${new Date().toISOString()}] Pinged Cron A successfully!`);
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Failed to ping Cron A:`,
      error.message
    );
  }
};

// Cài đặt cron job để gọi Cron A mỗi phút
cron.schedule("* * * * *", async () => {
  console.log(
    `[${new Date().toISOString()}] Running cron job to ping Cron A...`
  );
  await pingCronA();
});

// Route để nhận yêu cầu từ Cron A
app.get("/ping-from-crona", async (req, res) => {
  console.log(
    `[${new Date().toISOString()}] Received ping from Cron A, responding...`
  );
  res.status(200).send("Received ping from Cron A successfully!");
});

// Bắt đầu server Express
app.listen(PORT, () => {
  console.log(`Cron B is running on http://localhost:${PORT}`);
});
