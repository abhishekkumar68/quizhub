const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt database connection using URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit process with failure code if connection fails
    process.exit(1);
  }
};

module.exports = connectDB;