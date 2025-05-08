"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
<<<<<<< HEAD
const trivia_service_1 = require("../services/trivia.service");
// Fetch questions for the game
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category = "Music", count = 5 } = req.query;
    try {
        // Call TriviaService to fetch questions
        const questions = yield trivia_service_1.TriviaService.fetchQuestions(String(category), Number(count));
=======
const question_model_1 = require("../models/question.model");
const score_utils_1 = require("../utils/score.utils");
const getQuestions = async (req, res) => {
    const { category = "Music", count = 5 } = req.query;
    try {
        const questions = await question_model_1.QuestionModel.getRandomQuestionsByCategory(String(category), Number(count));
>>>>>>> game-one
        res.status(200).json(questions);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch questions", error: err });
    }
};
exports.getQuestions = getQuestions;
<<<<<<< HEAD
// Submit answers and evaluate score
const submitAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answers } = req.body; // [{ questionId, selected }]
    try {
        // Call TriviaService to evaluate answers and calculate the score
        const results = yield trivia_service_1.TriviaService.evaluateAnswers(answers);
=======
const submitAnswers = async (req, res) => {
    const { answers } = req.body;
    try {
        const results = await (0, score_utils_1.calculateTriviaScore)(answers);
>>>>>>> game-one
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to calculate score", error: err });
    }
};
exports.submitAnswers = submitAnswers;
