"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriviaService = void 0;
const Question_model_1 = require("../models/Question.model");
const score_utils_1 = require("../utils/score.utils");
class TriviaService {
    // Fetching random questions by category and count
    static async fetchQuestions(category, count) {
        return Question_model_1.QuestionModel.getRandomQuestionsByCategory(category, count);
    }
    // Evaluating answers and calculating the score using the calculateTriviaScore utility
    static async evaluateAnswers(answers) {
        try {
            // Call the calculateTriviaScore function to evaluate the answers
            const results = await (0, score_utils_1.calculateTriviaScore)(answers);
            return results;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to calculate score: " + error.message);
            }
            else {
                throw new Error("Failed to calculate score: Unknown error");
            }
        }
    }
}
exports.TriviaService = TriviaService;
