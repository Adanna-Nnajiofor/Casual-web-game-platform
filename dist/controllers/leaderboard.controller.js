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
exports.postScore = exports.getLeaderboard = void 0;
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
// GET leaderboard for a specific game (public)
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    try {
        const leaderboard = yield Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 })
            .limit(10);
        res.json(leaderboard);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
});
exports.getLeaderboard = getLeaderboard;
// POST a new score to the leaderboard (authenticated users only)
const postScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, score } = req.body;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { _id: userId, username } = req.user;
    try {
        const game = yield Game_model_1.default.findById(gameId);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        const newScore = yield Leaderboard_model_1.default.create({
            gameId,
            userId,
            username,
            score,
        });
        res.status(201).json(newScore);
    }
    catch (err) {
        const error = err;
        res
            .status(500)
            .json({ message: "Something went wrong", error: error.message });
    }
});
exports.postScore = postScore;
