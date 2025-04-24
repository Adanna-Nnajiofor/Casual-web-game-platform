import mongoose from "mongoose";

const connectDB = async () => {
  const isProd = process.env.NODE_ENV === "production";
  const MONGO_URI = isProd
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_LOCAL;

  if (!MONGO_URI) {
    console.error(" MongoDB URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log(` MongoDB connected: ${isProd ? "Production" : "Local"} mode`);
  } catch (error) {
    console.error(" MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
