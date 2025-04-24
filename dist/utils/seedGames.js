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
function seedGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            yield Game_model_1.default.deleteMany({});
            yield Game_model_1.default.insertMany(gameDataWithSlugs);
            console.log(" Game data seeded successfully");
            // Gracefully close the connection
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
        catch (err) {
            console.error(" Seeding error:", err);
            // Attempt graceful shutdown even on failure
            yield mongoose_1.default.disconnect();
            process.exit(1);
        }
    });
}
seedGames();
