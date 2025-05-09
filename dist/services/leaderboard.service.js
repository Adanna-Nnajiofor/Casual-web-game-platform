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
exports.getUserRankService = exports.getUserScoreService = exports.getFriendLeaderboardService = exports.postScoreService = exports.getLeaderboardService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const Game_model_1 = __importDefault(require("../models/Game.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const AppError_1 = require("../utils/AppError");
const leaderboard_pipeline_1 = require("./leaderboard.pipeline");
const getLeaderboardService = (gameId_1, ...args_1) => __awaiter(void 0, [gameId_1, ...args_1], void 0, function* (gameId, page = 1, limit = 10, userId) {
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        throw new AppError_1.AppError("Invalid game ID", 400);
    }
    if (userId && !mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.AppError("Invalid user ID", 400);
    }
    const skip = (page - 1) * limit;
    const pipeline = (0, leaderboard_pipeline_1.buildLeaderboardPipeline)(gameId, userId, skip, limit);
    const result = yield Leaderboard_model_1.default.aggregate(pipeline);
    if (!result.length) {
        throw new AppError_1.AppError(userId
            ? "User not found on leaderboard"
            : "No entries found for this game", 404);
    }
    return userId ? result[0] : result;
});
exports.getLeaderboardService = getLeaderboardService;
const postScoreService = (gameId, score, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        throw new AppError_1.AppError("Invalid game ID", 400);
    }
    if (typeof score !== "number" || score < 0) {
        throw new AppError_1.AppError("Score must be a non-negative number", 400);
    }
    const game = yield Game_model_1.default.findById(gameId);
    if (!game)
        throw new AppError_1.AppError("Game not found", 404);
    return yield Leaderboard_model_1.default.findOneAndUpdate({ gameId, userId }, { $max: { score } }, { upsert: true, new: true });
});
exports.postScoreService = postScoreService;
const getFriendLeaderboardService = (gameId, page, limit, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        throw new AppError_1.AppError("Invalid game ID", 400);
    }
    const userDoc = yield user_model_1.default.findById(userId);
    if (!userDoc)
        throw new AppError_1.AppError("User not found", 404);
    const friendsList = userDoc.friends || [];
    if (friendsList.length === 0)
        return [];
    return yield Leaderboard_model_1.default.find({ gameId, userId: { $in: friendsList } })
        .populate("userId", "username")
        .sort({ score: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
});
exports.getFriendLeaderboardService = getFriendLeaderboardService;
const getUserScoreService = (gameId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        throw new AppError_1.AppError("Invalid game ID", 400);
    }
    const entry = yield Leaderboard_model_1.default.findOne({ gameId, userId })
        .populate("userId", "username")
        .select("score userId");
    if (!entry || !entry.userId) {
        throw new AppError_1.AppError("User not found on leaderboard for this game", 404);
    }
    return {
        username: entry.userId.username,
        score: entry.score,
    };
});
exports.getUserScoreService = getUserScoreService;
const getUserRankService = (gameId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(gameId)) {
        throw new AppError_1.AppError("Invalid game ID", 400);
    }
    const leaderboard = yield Leaderboard_model_1.default.find({ gameId })
        .populate("userId", "username")
        .sort({ score: -1 });
    const index = leaderboard.findIndex((entry) => typeof entry.userId === "object" &&
        "_id" in entry.userId &&
        entry.userId._id.toString() === userId.toString());
    if (index === -1)
        throw new AppError_1.AppError("User not found on leaderboard", 404);
    return {
        username: leaderboard[index].userId.username,
        rank: index + 1,
        score: leaderboard[index].score,
    };
});
exports.getUserRankService = getUserRankService;
