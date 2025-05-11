"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
require("dotenv/config");
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const questionsCollection = db.collection("questions");
exports.QuestionModel = {
    async getRandomQuestionsByCategory(category, count) {
        const snapshot = await questionsCollection
            .where("category", "==", category)
            .get();
        const allQuestions = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        // Shuffle and pick count questions
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },
};
