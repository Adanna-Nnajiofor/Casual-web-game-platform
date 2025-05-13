"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTriviaScore = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const calculateTriviaScore = async (answers) => {
    let score = 0;
    let correctAnswers = 0;
    for (const answer of answers) {
        const doc = await db.collection("questions").doc(answer.questionId).get();
        const data = doc.data();
        if (!data)
            continue;
        const isCorrect = data.answer === answer.selected;
        if (isCorrect) {
            score += 10;
            correctAnswers += 1;
        }
    }
    return { score, correctAnswers, total: answers.length };
};
exports.calculateTriviaScore = calculateTriviaScore;
