const mongoose = require("mongoose");

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in back-end/.env");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    if (err.code === "ENOTFOUND") {
      console.error(
        "DB connection error: MongoDB host was not found. Update MONGO_URI in back-end/.env with a valid connection string."
      );
    } else {
      console.error("DB connection error:", err.message);
    }

    throw err;
  }
}

module.exports = connectDatabase;
