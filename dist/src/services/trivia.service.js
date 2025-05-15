"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriviaService = void 0;
const Question_model_1 = require("../models/Question.model");
const score_utils_1 = require("../utils/score.utils");
class TriviaService {
    // Fetch all random questions (any category)
    static async fetchAllQuestions(count) {
        try {
            // First get all available categories
            const allQuestions = (await Question_model_1.QuestionModel.getRandomQuestions(100)); // Get more questions initially
            const categories = [...new Set(allQuestions.map((q) => q.category))];
            // Calculate how many questions to get per category
            const questionsPerCategory = Math.ceil(count / categories.length);
            let finalQuestions = [];
            for (const category of categories) {
                const categoryQuestions = (await Question_model_1.QuestionModel.getRandomQuestionsByCategory(category, questionsPerCategory));
                finalQuestions = [...finalQuestions, ...categoryQuestions];
            }
            // Shuffle the final array and limit to requested count
            finalQuestions = finalQuestions
                .sort(() => Math.random() - 0.5)
                .slice(0, count);
            console.log(`Fetched questions by category:`, finalQuestions.reduce((acc, q) => {
                acc[q.category] = (acc[q.category] || 0) + 1;
                return acc;
            }, {}));
            return finalQuestions;
        }
        catch (error) {
            console.error("Error fetching all questions:", error);
            throw error;
        }
    }
    // Fetch questions by category
    static async fetchQuestionsByCategory(category, count) {
        try {
            const questions = (await Question_model_1.QuestionModel.getRandomQuestionsByCategory(category, count));
            console.log(`Fetched ${questions.length} questions for category: ${category}`);
            return questions;
        }
        catch (error) {
            console.error(`Error fetching questions for category ${category}:`, error);
            throw error;
        }
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
