"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
        return;
    }
    // Only connect if not in test environment
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB connected: ${isProd ? "Production" : "Local"} mode`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
