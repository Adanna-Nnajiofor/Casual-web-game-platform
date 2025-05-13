"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
const trivia_service_1 = require("../services/trivia.service");
// Fetch questions for the game
const getQuestions = async (req, res) => {
    const { category, count = 5 } = req.query;
    console.log(`Fetching questions for category: ${category || "All"} with count: ${count}`);
    try {
        let questions;
        // If no category is specified, fetch all questions
        if (!category) {
            console.log("Fetching all questions");
            questions = await trivia_service_1.TriviaService.fetchQuestions("", Number(count));
        }
        else {
            console.log(`Fetching questions for category: ${category}`);
            questions = await trivia_service_1.TriviaService.fetchQuestions(String(category), Number(count));
        }
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
