"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedQuestions = seedQuestions;
exports.getQuestion = getQuestion;
exports.getLetterPoints = getLetterPoints;
exports.submitAnswer = submitAnswer;
const streetzScore_1 = require("../utils/streetzScore");
const letterPoint_model_1 = require("../models/letterPoint.model");
const firebase_admin_1 = require("../config/firebase-admin");
const streetz_service_1 = require("../services/streetz.service");
const slangValidator_1 = require("../utils/slangValidator");
const db = firebase_admin_1.admin.firestore();
const questionsCollection = db.collection("questions");
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
async function seedQuestions(req, res) {
    try {
        // Call the seedNigerianQuestions function to seed questions
        const seededQuestions = await (0, streetz_service_1.seedNigerianQuestions)();
        // Log the seeded questions for debugging purposes
        console.log("Seeded Questions:", seededQuestions);
        res.json({
            status: true,
            message: "Questions seeded successfully",
            seededQuestions,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to seed questions",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
// GET a question
async function getQuestion(req, res) {
    try {
        // Fetch a random question (category can be adjusted as needed)
        const question = await (0, streetz_service_1.getARandomQuestion)();
        // If no questions are found
        if (!question) {
            res.status(404).json({ error: "No questions found" });
            return;
        }
        // Ensure the question has the required fields
        // If questionText or answer is missing, handle it
        if (!question.question || !question.answer) {
            res.status(500).json({ error: "Invalid question data" });
            return;
        }
        res.json({
            status: true,
            question
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch question", details: error });
    }
}
// GET letter points
async function getLetterPoints(req, res) {
    try {
        const letters = await letterPoint_model_1.LetterPoint.find();
        const letterPoints = Object.fromEntries(letters.map((l) => [l.letter.toLowerCase(), l.point]));
        res.json(letterPoints);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to fetch letter points", details: error });
    }
}
// POST submit answer
async function submitAnswer(req, res) {
    const { questionId, playerAnswer } = req.body;
    if (!questionId || !playerAnswer) {
        res.status(400).json({ error: "Missing questionId or playerAnswer" });
        return;
    }
    try {
        const snapshot = await questionsCollection.doc(questionId).get();
        const question = snapshot.data();
        if (!question) {
            res.status(404).json({ error: "Question not found" });
            return;
        }
        const typedQuestion = question;
        const isValid = await (0, slangValidator_1.isValidSlang)(playerAnswer);
        if (!isValid) {
            res.status(400).json({
                valid: false,
                message: "No be am!",
                score: 0,
                correctAnswer: typedQuestion.answer,
            });
            return;
        }
        const score = (0, streetzScore_1.calculateScore)(typedQuestion.answer, playerAnswer, letterPoints);
        res.json({
            valid: true,
            correctAnswer: typedQuestion.answer,
            playerAnswer,
            score,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "An error occurred while submitting the answer",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
