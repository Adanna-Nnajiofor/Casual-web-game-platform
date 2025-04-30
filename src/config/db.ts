import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  const isProd = process.env.NODE_ENV === "production";
  const MONGO_URI = isProd
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_LOCAL;

  if (!MONGO_URI) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  // Skip connection in test environment to prevent crash
  if (process.env.NODE_ENV === "test") {
    console.log("Running in test environment - MongoDB not connected");
    return; // Don't try to connect to the database during tests
  }

  // Only connect if not in test environment
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${isProd ? "Production" : "Local"} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
