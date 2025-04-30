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
exports.getFeedbackForTarget = exports.submitFeedback = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
// Submit feedback (emoji) to a target (user or product)
const submitFeedback = (userId, emoji, targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the user
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Create a new feedback document
        const feedback = new feedback_model_1.default({
            user: userId, // Reference to the user giving feedback
            emoji,
            target: targetId, // Reference to the target of feedback
            targetType,
        });
        // Save feedback to the database
        yield feedback.save();
        console.log("Feedback submitted successfully");
    }
    catch (error) {
        console.error("Error submitting feedback:", error);
        throw new Error("Error submitting feedback");
    }
});
exports.submitFeedback = submitFeedback;
// Fetch feedback for a specific target
const getFeedbackForTarget = (targetId, targetType, emoji, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            target: targetId,
            targetType,
        };
        if (emoji)
            filter.emoji = emoji;
        if (userId)
            filter.user = userId;
        const feedbacks = yield feedback_model_1.default.find(filter).populate("user", "name email");
        return feedbacks;
    }
    catch (error) {
        console.error("Error retrieving feedback:", error);
        throw new Error("Error retrieving feedback");
    }
});
exports.getFeedbackForTarget = getFeedbackForTarget;
