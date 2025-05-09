"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const db_1 = __importDefault(require("../config/db"));
dotenv_1.default.config();
const games = [
    {
        title: "Memory Match",
        description: "Test your memory with this fun game!",
        difficultyLevels: ["Easy", "Medium", "Hard"],
        isWeb3Enabled: false,
        assets: {
            coverImage: "https://example.com/memory.jpg",
            trailerUrl: "https://example.com/memory-trailer.mp4",
        },
    },
    {
        title: "Speed Typing",
        description: "Type fast and accurately to win.",
        difficultyLevels: ["Easy", "Medium"],
        isWeb3Enabled: false,
        assets: {
            coverImage: "https://example.com/typing.jpg",
            trailerUrl: "https://example.com/typing-trailer.mp4",
        },
    },
    {
        title: "Logic Puzzle",
        description: "Challenge your brain with logic games.",
        difficultyLevels: ["Medium", "Hard"],
        isWeb3Enabled: true,
        assets: {
            coverImage: "https://example.com/puzzle.jpg",
            trailerUrl: "https://example.com/puzzle-trailer.mp4",
        },
    },
];
const gameDataWithSlugs = games.map((game) => (Object.assign(Object.assign({}, game), { slug: (0, slugify_1.default)(game.title, { lower: true }) })));
async function seedGames() {
    try {
        await (0, db_1.default)();
        await Game_model_1.default.deleteMany({});
        await Game_model_1.default.insertMany(gameDataWithSlugs);
        console.log(" Game data seeded successfully");
        // Gracefully close the connection
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (err) {
        console.error(" Seeding error:", err);
        // Attempt graceful shutdown even on failure
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
seedGames();
