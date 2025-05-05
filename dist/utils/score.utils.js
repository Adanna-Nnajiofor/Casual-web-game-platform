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
exports.calculateTriviaScore = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const calculateTriviaScore = (answers) => __awaiter(void 0, void 0, void 0, function* () {
    let score = 0;
    let correctAnswers = 0;
    for (const answer of answers) {
        const doc = yield db.collection("questions").doc(answer.questionId).get();
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
});
exports.calculateTriviaScore = calculateTriviaScore;
