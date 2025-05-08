"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestion = getQuestion;
exports.getLetterPoints = getLetterPoints;
exports.submitAnswer = submitAnswer;
const question_model_1 = require("../models/question.model");
const streetzScore_1 = require("../utils/streetzScore");
const letterPoint_model_1 = require("../models/letterPoint.model");
const firebase_admin_1 = require("../config/firebase-admin");
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
// GET a question
async function getQuestion(req, res) {
    try {
        // Fetch a random question (category can be adjusted as needed)
        const questions = await question_model_1.QuestionModel.getRandomQuestionsByCategory("general", 1);
        // If no questions are found
        if (questions.length === 0) {
            res.status(404).json({ error: "No questions found" });
            return;
        }
        // Ensure the question has the required fields
        const question = questions[0]; // Type assertion to ensure it is of type Question
        // If questionText or answer is missing, handle it
        if (!question.questionText || !question.answer) {
            res.status(500).json({ error: "Invalid question data" });
            return;
        }
        const { id, questionText, answer } = question;
        res.json({
            id,
            questionText,
            answer,
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
    // Validate input
    if (!questionId || !playerAnswer) {
        res.status(400).json({ error: "Missing questionId or playerAnswer" });
        return;
    }
    try {
        // Fetch the question from Firestore by ID
        const snapshot = await questionsCollection.doc(questionId).get();
        const question = snapshot.data(); // This should contain questionText, answer, and other fields
        if (!question) {
            res.status(404).json({ error: "Question not found" });
            return;
        }
        // Type assertion to ensure the question object matches the expected structure
        const typedQuestion = question;
        // Calculate the score for the player's answer
        const score = (0, streetzScore_1.calculateScore)(typedQuestion.answer, playerAnswer, letterPoints);
        // Respond with the calculated score and the correct answer
        res.json({
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
