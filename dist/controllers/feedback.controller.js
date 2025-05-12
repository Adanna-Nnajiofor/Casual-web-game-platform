"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedback = exports.submitFeedback = void 0;
const feedbackService = __importStar(require("../services/feedback.service"));
// Submit feedback route
const submitFeedback = async (req, res) => {
    const { userId, emoji, targetId, targetType } = req.body;
    if (!userId || !emoji || !targetId || !targetType) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        // Call the feedback service to submit feedback
        await feedbackService.submitFeedback(userId, emoji, targetId, targetType);
        res.status(201).json({ message: "Feedback submitted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
exports.submitFeedback = submitFeedback;
// Get feedback for a specific target
const getFeedback = async (req, res) => {
    const { targetId, targetType, emoji, userId } = req.query;
    if (!targetId || !targetType) {
        res.status(400).json({ message: "Missing required query parameters" });
        return;
    }
    try {
        const feedbacks = await feedbackService.getFeedbackForTarget(targetId, targetType, emoji, userId);
        res.status(200).json({ feedbacks });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
exports.getFeedback = getFeedback;
