"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("../config/db"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
dotenv_1.default.config();
const leaderboardData = [
    {
        user: "gamerqueen@example.com",
        game: "Memory Match",
        score: 850,
    },
    {
        user: "proplayer@example.com",
        game: "Speed Typing",
        score: 1200,
    },
    {
        user: "casualchamp@example.com",
        game: "Logic Puzzle",
        score: 950,
    },
];
async function seedLeaderboard() {
    try {
        await (0, db_1.default)();
        const users = await user_model_1.default.find({
            email: { $in: leaderboardData.map((data) => data.user) },
        });
        const games = await Game_model_1.default.find({
            title: { $in: leaderboardData.map((data) => data.game) },
        });
        const leaderboardEntries = leaderboardData.map((entry) => {
            const user = users.find((u) => u.email === entry.user);
            const game = games.find((g) => g.title === entry.game);
            return {
                userId: user === null || user === void 0 ? void 0 : user._id,
                username: (user === null || user === void 0 ? void 0 : user.username) || "", // fallback for safety
                gameId: game === null || game === void 0 ? void 0 : game._id,
                score: entry.score,
            };
        });
        await Leaderboard_model_1.default.deleteMany({});
        await Leaderboard_model_1.default.insertMany(leaderboardEntries);
        console.log(" Leaderboard data seeded successfully");
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error(" Error seeding leaderboard:", error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
seedLeaderboard();
