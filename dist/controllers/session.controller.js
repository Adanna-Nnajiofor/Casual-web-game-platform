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
exports.saveSession = void 0;
const Session_model_1 = __importDefault(require("../models/Session.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const score_service_1 = require("../services/score.service");
const AppError_1 = require("../utils/AppError");
const saveSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, gameId, score, duration, difficulty, completed } = req.body;
    try {
        // Check if the user is authenticated
        if (!req.user || req.user.id !== userId) {
            return next(new AppError_1.AppError("Unauthorized access", 401));
        }
        // Check if the game exists
        const gameExists = yield Game_model_1.default.findById(gameId);
        if (!gameExists) {
            return next(new AppError_1.AppError("Game not found", 404));
        }
        // Check if the user exists
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        // Create a new session
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
        // Update or create the leaderboard score if the score qualifies
        yield Leaderboard_model_1.default.findOneAndUpdate({ userId, gameId }, { $max: { score } }, { upsert: true, new: true });
        res.status(201).json({ message: "Session saved", session: newSession });
    }
    catch (error) {
        next(error);
    }
});
exports.saveSession = saveSession;
