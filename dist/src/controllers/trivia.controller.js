"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
const trivia_service_1 = require("../services/trivia.service");
// Fetch questions for the game
// Get all or category-specific questions
const getQuestions = async (req, res) => {
    const { category, count = 10 } = req.query;
    console.log("Trivia Questions Request:", {
        category,
        count,
        headers: req.headers,
        method: req.method,
    });
    try {
        let questions;
        if (category) {
            questions = await trivia_service_1.TriviaService.fetchQuestionsByCategory(String(category), Number(count));
        }
        else {
            questions = await trivia_service_1.TriviaService.fetchAllQuestions(Number(count));
        }
        console.log(`Successfully fetched ${questions.length} questions`);
        // Set explicit headers again just to be sure
        res.header("Access-Control-Allow-Origin", req.headers.origin || "https://ezzzinne.github.io");
        res.header("Access-Control-Allow-Credentials", "true");
        res.status(200).json(questions);
    }
    catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ message: "Failed to fetch questions", error: err });
    }
};
exports.getQuestions = getQuestions;
// Submit answers and evaluate score
const submitAnswers = async (req, res) => {
    const { answers } = req.body; // [{ questionId, selected }]
    try {
        // Call TriviaService to evaluate answers and calculate the score
        const results = await trivia_service_1.TriviaService.evaluateAnswers(answers);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to calculate score", error: err });
    }
};
exports.submitAnswers = submitAnswers;
