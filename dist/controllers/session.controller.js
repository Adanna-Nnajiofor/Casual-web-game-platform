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
const score_service_1 = require("../services/score.service");
// Save a game session
const saveSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, gameId, score, duration, difficulty, completed } = req.body;
    try {
        // Check if the game exists
        const gameExists = yield Game_model_1.default.findById(gameId);
        if (!gameExists) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        // Check if the user exists
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
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
        // Calculate new score
        const newTotalScore = user.stats.totalScore + score;
        // Validate and update score
        yield (0, score_service_1.validateAndUpdateScore)(userId, newTotalScore);
        // Update total games played
        user.stats.totalGamesPlayed += 1;
        yield user.save();
        res.status(201).json({ message: "Session saved", session: newSession });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error saving session:", error.message);
            res.status(500).json({ message: "Server error", error: error.message });
        }
        else {
            console.error("Unexpected error:", error);
            res.status(500).json({ message: "Server error", error: "Unknown error" });
        }
    }
});
exports.saveSession = saveSession;
