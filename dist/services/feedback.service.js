"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbackForTarget = exports.submitFeedback = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const feedback_model_1 = __importDefault(require("../models/feedback.model"));
// Submit feedback (emoji) to a target (user or product)
const submitFeedback = async (userId, emoji, targetId, targetType) => {
    try {
        // Validate the user
        const user = await user_model_1.default.findById(userId);
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
        await feedback.save();
        console.log("Feedback submitted successfully");
    }
    catch (error) {
        console.error("Error submitting feedback:", error);
        throw new Error("Error submitting feedback");
    }
};
exports.submitFeedback = submitFeedback;
// Fetch feedback for a specific target
const getFeedbackForTarget = async (targetId, targetType, emoji, userId) => {
    try {
        const filter = {
            target: targetId,
            targetType,
        };
        if (emoji)
            filter.emoji = emoji;
        if (userId)
            filter.user = userId;
        const feedbacks = await feedback_model_1.default.find(filter).populate("user", "name email");
        return feedbacks;
    }
    catch (error) {
        console.error("Error retrieving feedback:", error);
        throw new Error("Error retrieving feedback");
    }
};
exports.getFeedbackForTarget = getFeedbackForTarget;
