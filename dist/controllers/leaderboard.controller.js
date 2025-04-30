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
exports.getFriendLeaderboard = exports.postScore = exports.getLeaderboard = void 0;
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// GET leaderboard for a specific game with pagination (public)
const getLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit to 10
    try {
        const leaderboard = yield Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 })
            .skip((Number(page) - 1) * Number(limit)) // Pagination logic
            .limit(Number(limit)); // Limit results
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
// GET friend leaderboard for a specific game (filter by user's friends list)
const getFriendLeaderboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit to 10
    const { _id: userId } = req.user; // Get the user ID of the authenticated user
    try {
        // Fetch the authenticated user's details from the database
        const userDoc = yield user_model_1.default.findById(userId);
        if (!userDoc) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Get the user's friends list
        const friendsList = userDoc.friends || [];
        // If the user has no friends, return an empty leaderboard
        if (friendsList.length === 0) {
            res.status(200).json([]);
            return;
        }
        // Fetch leaderboard data of only the friends
        const leaderboard = yield Leaderboard_model_1.default.find({
            gameId,
            userId: { $in: friendsList },
        })
            .populate("userId", "username") // Populate username field from the User model
            .sort({ score: -1 }) // Sort by score descending
            .skip((Number(page) - 1) * Number(limit)) // Pagination logic
            .limit(Number(limit)); // Limit results
        res.json(leaderboard);
    }
    catch (err) {
        if (err instanceof Error) {
            // Check if error is an instance of Error
            res.status(500).json({
                message: "Failed to fetch friend leaderboard",
                error: err.message,
            });
        }
        else {
            // Fallback for unexpected error types
            res.status(500).json({
                message: "Failed to fetch friend leaderboard",
                error: "An unknown error occurred",
            });
        }
    }
});
exports.getFriendLeaderboard = getFriendLeaderboard;
