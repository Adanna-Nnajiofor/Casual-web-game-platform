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
exports.validateAndUpdateScore = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const Leaderboard_model_1 = __importDefault(require("../models/Leaderboard.model"));
const errorHandler_1 = require("../utils/errorHandler");
// Validate score update and apply changes
const validateAndUpdateScore = (userId, newScore, gameId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        const currentScore = user.stats.totalScore || 0;
        const maxScoreIncrease = 10;
        // Anti-cheat check
        if (newScore - currentScore > maxScoreIncrease) {
            user.flags = user.flags || [];
            user.flags.push({
                type: "score manipulation",
                reason: `Attempted to increase score from ${currentScore} to ${newScore}`,
                timestamp: new Date(),
            });
            yield user.save();
            throw new Error("Invalid score increase. Anti-cheat triggered.");
        }
        // Achievement logic
        const newAchievements = [];
        if (currentScore < 100 && newScore >= 100) {
            newAchievements.push("Centurion");
        }
        if (currentScore < 500 && newScore >= 500) {
            newAchievements.push("Legend");
        }
        if (currentScore < 1000 && newScore >= 1000) {
            newAchievements.push("Elite");
        }
        // Merge and de-duplicate achievements
        user.stats.achievements = [
            ...new Set([...user.stats.achievements, ...newAchievements]),
        ];
        // Update score
        user.stats.totalScore = newScore;
        yield user.save();
        // Upsert leaderboard entry
        yield Leaderboard_model_1.default.findOneAndUpdate({ userId: user._id, gameId }, {
            userId: user._id,
            gameId,
            username: user.username,
            score: newScore,
            updatedAt: new Date(),
        }, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log(`Score and leaderboard updated for user ${userId}`);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(error, "validateAndUpdateScore");
        throw error;
    }
});
exports.validateAndUpdateScore = validateAndUpdateScore;
