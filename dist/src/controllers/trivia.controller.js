"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
const trivia_service_1 = require("../services/trivia.service");
// Fetch questions for the game
// Get all or category-specific questions
const getQuestions = async (req, res) => {
    try {
        const count = req.query.count ? parseInt(req.query.count) : 10;
        const category = req.query.category;
        // Validate count
        if (isNaN(count) || count < 1 || count > 100) {
            res.status(400).json({
                message: "Invalid count parameter. Must be a number between 1 and 100",
            });
            return;
        }
        console.log("Trivia Questions Request:", {
            category: category || "all categories",
            count,
            headers: req.headers,
            method: req.method,
            url: req.originalUrl,
        });
        let questions;
        if (category) {
            console.log(`Fetching ${count} questions for category: ${category}`);
            questions = await trivia_service_1.TriviaService.fetchQuestionsByCategory(category, count);
        }
        else {
            console.log(`Fetching ${count} questions from all categories`);
            questions = await trivia_service_1.TriviaService.fetchAllQuestions(count);
        }
        // Log the results
        const questionsByCategory = questions.reduce((acc, q) => {
            acc[q.category] = (acc[q.category] || 0) + 1;
            return acc;
        }, {});
        console.log("Questions fetched by category:", questionsByCategory);
        console.log(`Successfully fetched ${questions.length} total questions`);
        // Set CORS headers
        if (req.headers.origin) {
            res.header("Access-Control-Allow-Origin", req.headers.origin);
            res.header("Access-Control-Allow-Credentials", "true");
        }
        res.status(200).json({
            success: true,
            count: questions.length,
            distribution: questionsByCategory,
            questions,
        });
    }
    catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch questions",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.getQuestions = getQuestions;
// Submit answers and evaluate score
const submitAnswers = async (req, res) => {
    try {
        const { answers } = req.body;
        // Validate answers array
        if (!Array.isArray(answers) || answers.length === 0) {
            res.status(400).json({
                success: false,
                message: "Invalid answers format. Expected non-empty array of answers",
            });
            return;
        }
        // Validate each answer object
        for (const answer of answers) {
            if (!answer.questionId || !answer.selected) {
                res.status(400).json({
                    success: false,
                    message: "Each answer must have questionId and selected fields",
                });
                return;
            }
        }
        console.log(`Processing ${answers.length} answers submission`);
        const results = await trivia_service_1.TriviaService.evaluateAnswers(answers);
        res.status(200).json({
            success: true,
            results,
        });
    }
    catch (err) {
        console.error("Error evaluating answers:", err);
        res.status(500).json({
            success: false,
            message: "Failed to calculate score",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
};
exports.submitAnswers = submitAnswers;
