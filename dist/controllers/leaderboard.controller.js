"use strict";
<<<<<<< HEAD
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
>>>>>>> dev
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRank = exports.getUserScore = exports.getFriendLeaderboard = exports.postScore = exports.getLeaderboard = void 0;
const leaderboard_service_1 = require("../services/leaderboard.service");
const AppError_1 = require("../utils/AppError");
<<<<<<< HEAD
// Controller to fetch the leaderboard for a specific game, with pagination support
const getLeaderboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
=======
// GET leaderboard for a specific game with pagination (public)
const getLeaderboard = async (req, res, next) => {
>>>>>>> dev
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    try {
<<<<<<< HEAD
        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        // Validate pagination parameters
        if (isNaN(parsedPage) ||
            parsedPage < 1 ||
            isNaN(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 100) {
            throw new AppError_1.AppError("Invalid pagination parameters", 400);
        }
        // Fetch the leaderboard from the service
        const leaderboard = yield (0, leaderboard_service_1.getLeaderboardService)(gameId, parsedPage, parsedLimit);
=======
        const leaderboard = await Leaderboard_model_1.default.find({ gameId })
            .populate("userId", "username")
            .sort({ score: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit);
>>>>>>> dev
        res.json(leaderboard);
    }
    catch (err) {
        next(err);
    }
};
exports.getLeaderboard = getLeaderboard;
<<<<<<< HEAD
// Controller to post a score for a user in a specific game
const postScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
=======
// POST a new score to the leaderboard (authenticated users only)
const postScore = async (req, res, next) => {
>>>>>>> dev
    var _a;
    try {
        const { gameId, score } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId)
<<<<<<< HEAD
            throw new AppError_1.AppError("Unauthorized", 401);
        const updatedScore = yield (0, leaderboard_service_1.postScoreService)(gameId, score, userId);
=======
            return next(new AppError_1.AppError("Unauthorized", 401));
        if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
            return next(new AppError_1.AppError("Invalid game ID", 400));
        }
        if (typeof score !== "number" || score < 0) {
            return next(new AppError_1.AppError("Score must be a non-negative number", 400));
        }
        const game = await Game_model_1.default.findById(gameId);
        if (!game)
            return next(new AppError_1.AppError("Game not found", 404));
        const updatedScore = await Leaderboard_model_1.default.findOneAndUpdate({ gameId, userId }, { $max: { score } }, { upsert: true, new: true });
>>>>>>> dev
        res.status(201).json(updatedScore);
    }
    catch (err) {
        next(err);
    }
};
exports.postScore = postScore;
<<<<<<< HEAD
// Controller to get the leaderboard for the user's friends
const getFriendLeaderboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
=======
// GET friend leaderboard for a specific game (filter by user's friends list)
const getFriendLeaderboard = async (req, res, next) => {
>>>>>>> dev
    var _a;
    const { gameId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        if (!userId)
            throw new AppError_1.AppError("Unauthorized", 401);
        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        // Validate pagination parameters
        if (isNaN(parsedPage) ||
            parsedPage < 1 ||
            isNaN(parsedLimit) ||
            parsedLimit < 1 ||
            parsedLimit > 100) {
            throw new AppError_1.AppError("Invalid pagination parameters", 400);
        }
<<<<<<< HEAD
        // Fetch the friend's leaderboard from the service
        const leaderboard = yield (0, leaderboard_service_1.getFriendLeaderboardService)(gameId, parsedPage, parsedLimit, userId);
=======
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
>>>>>>> dev
        res.json(leaderboard);
    }
    catch (err) {
        next(err);
    }
};
exports.getFriendLeaderboard = getFriendLeaderboard;
// Controller to fetch the score of a specific user for a game
const getUserScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { gameId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        if (!userId)
            throw new AppError_1.AppError("Unauthorized", 401);
        const data = yield (0, leaderboard_service_1.getUserScoreService)(gameId, userId);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserScore = getUserScore;
// Controller to fetch the rank of a specific user for a game
const getUserRank = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { gameId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        if (!userId)
            throw new AppError_1.AppError("Unauthorized", 401);
        const rankData = yield (0, leaderboard_service_1.getUserRankService)(gameId, userId);
        res.json(rankData);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserRank = getUserRank;
