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
const user_model_1 = __importDefault(require("../models/user.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const Session_model_1 = __importDefault(require("../models/Session.model"));
dotenv_1.default.config();
function seedSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.default)();
            const users = yield user_model_1.default.find({});
            const games = yield Game_model_1.default.find({});
            if (users.length === 0 || games.length === 0) {
                console.error(" Users or Games not found. Please seed them first.");
                process.exit(1);
            }
            const sessionsData = [];
            // Generate 10 sessions
            for (let i = 0; i < 10; i++) {
                const user = users[Math.floor(Math.random() * users.length)];
                const game = games[Math.floor(Math.random() * games.length)];
                // Generate random session data
                const startedAt = new Date();
                const duration = Math.floor(Math.random() * 600); // up to 10 mins
                const endedAt = new Date(startedAt.getTime() + duration * 1000); // End time after the duration
                sessionsData.push({
                    userId: user._id,
                    gameId: game._id,
                    score: Math.floor(Math.random() * 1000),
                    duration: duration,
                    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)], // Random difficulty
                    completed: Math.random() > 0.3, // 70% chance to complete the game
                    startedAt: startedAt,
                    endedAt: endedAt,
                });
            }
            yield Session_model_1.default.deleteMany({});
            yield Session_model_1.default.insertMany(sessionsData);
            console.log(" Game sessions seeded successfully");
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
        catch (error) {
            console.error(" Error seeding sessions:", error);
            yield mongoose_1.default.disconnect();
            process.exit(1);
        }
    });
}
seedSessions();
