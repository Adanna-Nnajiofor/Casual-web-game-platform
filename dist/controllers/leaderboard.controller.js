"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendLeaderboard = exports.postScore = exports.getLeaderboard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const AppError_1 = require("../utils/AppError");
// GET leaderboard for a specific game with pagination (public)
const getLeaderboard = async (req, res, next) => {
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
        const leaderboard = await Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
        res.json(leaderboard);
    }
    catch (err) {
        next(new AppError_1.AppError("Failed to fetch leaderboard", 500));
    }
};
exports.getLeaderboard = getLeaderboard;
// POST a new score to the leaderboard (authenticated users only)
const postScore = async (req, res, next) => {
    var _a;
    try {
        const { gameId, score } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        // Validate user
        if (!userId)
            return next(new AppError_1.AppError("Unauthorized", 401));
        // Validate gameId format
        if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
            return next(new AppError_1.AppError("Invalid game ID", 400));
        }
        // Validate score
        if (typeof score !== "number" || score < 0) {
            return next(new AppError_1.AppError("Score must be a non-negative number", 400));
        }
        const game = await Game_model_1.default.findById(gameId);
        if (!game)
            return next(new AppError_1.AppError("Game not found", 404));
        const updatedScore = await Leaderboard_model_1.default.findOneAndUpdate({ gameId, userId }, { $max: { score } }, { upsert: true, new: true });
        res.status(201).json(updatedScore);
    }
    catch (error) {
        next(error);
    }
};
exports.postScore = postScore;
// GET friend leaderboard for a specific game (filter by user's friends list)
const getFriendLeaderboard = async (req, res, next) => {
    var _a;
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    // Validate gameId format
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        return next(new AppError_1.AppError("Invalid game ID", 400));
    }
    // Validate page and limit
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
        const userDoc = await user_model_1.default.findById(userId);
        if (!userDoc) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        const friendsList = userDoc.friends || [];
        if (friendsList.length === 0) {
            res.status(200).json([]);
            return;
        }
        const leaderboard = await Leaderboard_model_1.default.find({
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
};
exports.getFriendLeaderboard = getFriendLeaderboard;
