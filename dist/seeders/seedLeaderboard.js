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
function seedLeaderboard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            const users = yield user_model_1.default.find({
                email: { $in: leaderboardData.map((data) => data.user) },
            });
            const games = yield Game_model_1.default.find({
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
            yield Leaderboard_model_1.default.deleteMany({});
            yield Leaderboard_model_1.default.insertMany(leaderboardEntries);
            console.log(" Leaderboard data seeded successfully");
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
        catch (error) {
            console.error(" Error seeding leaderboard:", error);
            yield mongoose_1.default.disconnect();
            process.exit(1);
        }
    });
}
seedLeaderboard();
