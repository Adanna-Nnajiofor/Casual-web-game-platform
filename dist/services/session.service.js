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
exports.fetchSessionsByUser = exports.createAndSaveSession = void 0;
const Session_model_1 = __importDefault(require("../models/Session.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const AppError_1 = require("../utils/AppError");
const score_service_1 = require("./score.service");
// Create and save a session
const createAndSaveSession = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, gameId, score, duration, difficulty, completed } = req.body;
    // Check if the user is authenticated
    if (!req.user || req.user.id !== userId) {
        throw new AppError_1.AppError("Unauthorized access", 401);
    }
    // Check if game exists
    const gameExists = yield Game_model_1.default.findById(gameId);
    if (!gameExists) {
        throw new AppError_1.AppError("Game not found", 404);
    }
    // Check if user exists
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    // Create new session
    const newSession = new Session_model_1.default({
        userId,
        gameId,
        score,
        duration,
        difficulty,
        completed,
    });
    yield newSession.save();
    // Calculate new total score
    const newTotalScore = user.stats.totalScore + score;
    // Validate and update score
    yield (0, score_service_1.validateAndUpdateScore)(userId, newTotalScore, gameId);
    // Update total games played
    user.stats.totalGamesPlayed += 1;
    yield user.save();
    // Update or create leaderboard
    yield Leaderboard_model_1.default.findOneAndUpdate({ userId, gameId }, { $max: { score } }, { upsert: true, new: true });
    return newSession;
});
exports.createAndSaveSession = createAndSaveSession;
// Fetch sessions by user ID
const fetchSessionsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield Session_model_1.default.find({ userId })
        .populate("gameId", "title type")
        .sort({ createdAt: -1 });
    if (!sessions.length) {
        throw new AppError_1.AppError("No sessions found for this user", 404);
    }
    return sessions;
});
exports.fetchSessionsByUser = fetchSessionsByUser;
