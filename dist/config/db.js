"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Function to connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
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
        yield mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB connected: ${isProd ? "Production" : "Local"} mode`);
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
});
exports.default = connectDB;
