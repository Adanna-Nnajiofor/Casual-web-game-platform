"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
const question_model_1 = require("../models/question.model");
const score_utils_1 = require("../utils/score.utils");
const getQuestions = async (req, res) => {
    const { category = "Music", count = 5 } = req.query;
    try {
        const questions = await question_model_1.QuestionModel.getRandomQuestionsByCategory(String(category), Number(count));
        res.status(200).json(questions);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch questions", error: err });
    }
};
exports.getQuestions = getQuestions;
const submitAnswers = async (req, res) => {
    const { answers } = req.body;
    try {
        const results = await (0, score_utils_1.calculateTriviaScore)(answers);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to calculate score", error: err });
    }
};
exports.submitAnswers = submitAnswers;
