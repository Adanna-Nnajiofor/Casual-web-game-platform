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
// Validate score update and apply changes
const validateAndUpdateScore = (userId, newScore) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found.");
        }
        const currentScore = user.stats.totalScore || 0;
        const maxScoreIncrease = 10;
        if (newScore - currentScore > maxScoreIncrease) {
            // Optionally flag suspicious activity
            user.flags = user.flags || [];
            user.flags.push({
                type: "score manipulation",
                reason: `Attempted to increase score from ${currentScore} to ${newScore}`,
                timestamp: new Date(),
            });
            yield user.save(); // Save the flag
            throw new Error("Invalid score increase. Anti-cheat triggered.");
        }
        user.stats.totalScore = newScore;
        yield user.save();
        console.log(` Score updated for user ${userId}`);
    }
    catch (error) {
        console.error(" Error updating score:", error);
        throw error;
    }
});
exports.validateAndUpdateScore = validateAndUpdateScore;
