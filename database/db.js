const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

mongoose.set("strictQuery", false);
async function connectDB() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connection to MongoDB:", error.message);
  }
}

module.exports = connectDB;
