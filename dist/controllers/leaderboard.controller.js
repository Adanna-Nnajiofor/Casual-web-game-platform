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
exports.getUserRank = exports.getUserScore = exports.getFriendLeaderboard = exports.postScore = exports.getLeaderboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const AppError_1 = require("../utils/AppError");
// GET leaderboard for a specific game with pagination (public)
const getLeaderboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        return next(new AppError_1.AppError("Invalid game ID", 400));
    }
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    if (isNaN(parsedPage) || parsedPage < 1) {
        return next(new AppError_1.AppError("Page must be a positive number", 400));
    }
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return next(new AppError_1.AppError("Limit must be a number between 1 and 100", 400));
    }
    try {
        const leaderboard = yield Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
        res.json(leaderboard);
    }
    catch (err) {
        next(new AppError_1.AppError("Failed to fetch leaderboard", 500));
    }
});
exports.getLeaderboard = getLeaderboard;
// POST a new score to the leaderboard (authenticated users only)
const postScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { gameId, score } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId)
            return next(new AppError_1.AppError("Unauthorized", 401));
        if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
            return next(new AppError_1.AppError("Invalid game ID", 400));
        }
        if (typeof score !== "number" || score < 0) {
            return next(new AppError_1.AppError("Score must be a non-negative number", 400));
        }
        const game = yield Game_model_1.default.findById(gameId);
        if (!game)
            return next(new AppError_1.AppError("Game not found", 404));
        const updatedScore = yield Leaderboard_model_1.default.findOneAndUpdate({ gameId, userId }, { $max: { score } }, { upsert: true, new: true });
        res.status(201).json(updatedScore);
    }
    catch (error) {
        next(error);
    }
});
exports.postScore = postScore;
// GET friend leaderboard for a specific game (filter by user's friends list)
const getFriendLeaderboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        return next(new AppError_1.AppError("Invalid game ID", 400));
    }
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    if (isNaN(parsedPage) || parsedPage < 1) {
        return next(new AppError_1.AppError("Page must be a positive number", 400));
    }
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return next(new AppError_1.AppError("Limit must be a number between 1 and 100", 400));
    }
    try {
        if (!userId) {
            return next(new AppError_1.AppError("Unauthorized", 401));
        }
        const userDoc = yield user_model_1.default.findById(userId);
        if (!userDoc) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        const friendsList = userDoc.friends || [];
        if (friendsList.length === 0) {
            res.status(200).json([]);
            return;
        }
        const leaderboard = yield Leaderboard_model_1.default.find({
            gameId,
            userId: { $in: friendsList },
        })
            .populate("userId", "username")
            .sort({ score: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
        res.json(leaderboard);
    }
    catch (err) {
        next(new AppError_1.AppError("Failed to fetch friend leaderboard", 500));
    }
});
exports.getFriendLeaderboard = getFriendLeaderboard;
// GET a specific user's score for a particular game
const getUserScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { gameId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        return next(new AppError_1.AppError("Invalid game ID", 400));
    }
    if (!userId) {
        return next(new AppError_1.AppError("Unauthorized", 401));
    }
    try {
        const leaderboardEntry = yield Leaderboard_model_1.default.findOne({ gameId, userId })
            .populate("userId", "username")
            .select("score userId");
        if (!leaderboardEntry || !leaderboardEntry.userId) {
            return next(new AppError_1.AppError("User not found on leaderboard for this game", 404));
        }
        const user = leaderboardEntry.userId;
        if (typeof user === "object" && "username" in user) {
            res.json({
                username: user.username,
                score: leaderboardEntry.score,
            });
        }
        else {
            return next(new AppError_1.AppError("Failed to fetch user information", 500));
        }
    }
    catch (err) {
        next(new AppError_1.AppError("Failed to fetch user's score", 500));
    }
});
exports.getUserScore = getUserScore;
// GET user's rank in the leaderboard for a specific game
const getUserRank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { gameId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        return next(new AppError_1.AppError("Invalid game ID", 400));
    }
    if (!userId) {
        return next(new AppError_1.AppError("Unauthorized", 401));
    }
    try {
        const leaderboard = yield Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 });
        const userRank = leaderboard.findIndex((entry) => typeof entry.userId === "object" &&
            "_id" in entry.userId &&
            entry.userId._id.toString() === userId.toString());
        if (userRank === -1) {
            return next(new AppError_1.AppError("User not found on leaderboard", 404));
        }
        const user = leaderboard[userRank].userId;
        res.json({
            username: user.username,
            rank: userRank + 1,
            score: leaderboard[userRank].score,
        });
    }
    catch (err) {
        next(new AppError_1.AppError("Failed to fetch user rank", 500));
    }
});
exports.getUserRank = getUserRank;
