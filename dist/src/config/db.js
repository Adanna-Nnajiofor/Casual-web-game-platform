"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
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
        const conn = await mongoose_1.default.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        // Check if there are any games in the database
        const existingGames = await Game_model_1.default.find();
        console.log("Existing games in database:", existingGames);
        // If no games exist, add some test data
        if (existingGames.length === 0) {
            const testGames = [
                {
                    title: "Trivia Game",
                    description: "Test your knowledge!",
                    slug: "trivia-game",
                    type: "trivia",
                    difficultyLevels: ["Easy", "Medium", "Hard"],
                    isWeb3Enabled: false,
                },
                {
                    title: "Streetz Game",
                    description: "Street racing game!",
                    slug: "streetz-game",
                    type: "streetz",
                    difficultyLevels: ["Easy", "Medium", "Hard"],
                    isWeb3Enabled: false,
                },
            ];
            await Game_model_1.default.insertMany(testGames);
            console.log("Test games added to database");
        }
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
