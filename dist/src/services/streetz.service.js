"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerQuestion = exports.getQuestionsByCategory = exports.getRandomQuestionByCategory = exports.getARandomQuestion = exports.seedNigerianQuestions = exports.nigerianQuestions = void 0;
const streetz_model_1 = __importDefault(require("../models/streetz.model"));
exports.nigerianQuestions = [
    {
        question: "What is the name of a yellow bus that carries people in Nigeria?",
        answer: "danfo",
        category: "transportation",
    },
    {
        question: "What do Nigerians call a small shop by the roadside?",
        answer: "kiosk",
        category: "general",
    },
    {
        question: "What is the Nigerian pidgin word for 'money'?",
        answer: "ego",
        category: "slang",
    },
    {
        question: "What is the name of the popular Nigerian street food made from beans?",
        answer: "akara",
        category: "food",
    },
    {
        question: "What do Nigerians call a motorcycle used for public transport?",
        answer: "okada",
        category: "transportation",
    },
    {
        question: "What is the Nigerian pidgin word for 'friend'?",
        answer: "padi",
        category: "slang",
    },
    {
        question: "What is the name of the Nigerian dish made with cassava flakes?",
        answer: "garri",
        category: "food",
    },
    {
        question: "What is the Nigerian pidgin word for 'police'?",
        answer: "olopa",
        category: "slang",
    },
    {
        question: "What is the name of the Nigerian soup made with okra?",
        answer: "ila",
        category: "food",
    },
    {
        question: "What do Nigerians call a gathering where people contribute money for a common goal?",
        answer: "ajo",
        category: "culture",
    },
];
const letterPoints = {
    a: 2,
    b: 4,
    c: 3,
    d: 1,
    e: 5,
    f: 2,
    g: 4,
    h: 3,
    i: 1,
    j: 6,
    k: 3,
    l: 2,
    m: 4,
    n: 1,
    o: 5,
    p: 3,
    q: 10,
    r: 2,
    s: 1,
    t: 2,
    u: 4,
    v: 6,
    w: 4,
    x: 7,
    y: 3,
    z: 9,
};
const seedNigerianQuestions = async () => {
    const existingQuestions = await streetz_model_1.default.find({});
    if (existingQuestions.length > 0) {
        console.log('Questions already exist in the database.');
        return;
    }
    const questionsToInsert = exports.nigerianQuestions.map((q) => ({
        question: q.question,
        answer: q.answer,
        category: q.category,
    }));
    await streetz_model_1.default.insertMany(questionsToInsert);
    console.log('Nigerian questions have been added to the database.');
};
exports.seedNigerianQuestions = seedNigerianQuestions;
const getARandomQuestion = async () => {
    const randomQuestion = await streetz_model_1.default.aggregate([{ $sample: { size: 1 } }]);
    return randomQuestion[0];
};
exports.getARandomQuestion = getARandomQuestion;
const getRandomQuestionByCategory = async (category) => {
    const randomQuestion = await streetz_model_1.default.aggregate([
        { $match: { category } },
        { $sample: { size: 1 } }
    ]);
    return randomQuestion[0];
};
exports.getRandomQuestionByCategory = getRandomQuestionByCategory;
const getQuestionsByCategory = async (category) => {
    const questions = await streetz_model_1.default.find({ category });
    return questions;
};
exports.getQuestionsByCategory = getQuestionsByCategory;
const answerQuestion = async (questionId, answer) => {
    const question = await streetz_model_1.default.findById(questionId);
    if (!question) {
        throw new Error('Question not found');
    }
    const correctAnswer = question.answer;
    const isCorrect = correctAnswer.toLowerCase() === answer.toLowerCase();
    return {
        isCorrect,
        correctAnswer,
        points: isCorrect ? calculatePoints(answer) : 0,
    };
};
exports.answerQuestion = answerQuestion;
const calculatePoints = (answer) => {
    return answer
        .toLowerCase()
        .split('')
        .reduce((total, char) => total + (letterPoints[char] || 0), 0);
};
