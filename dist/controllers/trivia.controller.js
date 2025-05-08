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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswers = exports.getQuestions = void 0;
const trivia_service_1 = require("../services/trivia.service");
// Fetch questions for the game
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category = "Music", count = 5 } = req.query;
    try {
        // Call TriviaService to fetch questions
        const questions = yield trivia_service_1.TriviaService.fetchQuestions(String(category), Number(count));
        res.status(200).json(questions);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch questions", error: err });
    }
});
exports.getQuestions = getQuestions;
// Submit answers and evaluate score
const submitAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { answers } = req.body; // [{ questionId, selected }]
    try {
        // Call TriviaService to evaluate answers and calculate the score
        const results = yield trivia_service_1.TriviaService.evaluateAnswers(answers);
        res.status(200).json(results);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to calculate score", error: err });
    }
});
exports.submitAnswers = submitAnswers;
