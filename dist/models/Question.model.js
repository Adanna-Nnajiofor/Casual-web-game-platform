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
exports.QuestionModel = void 0;
require("dotenv/config");
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const questionsCollection = db.collection("questions");
exports.QuestionModel = {
    getRandomQuestionsByCategory(category, count) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield questionsCollection
                .where("category", "==", category)
                .get();
            const allQuestions = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            // Shuffle and pick `count` questions
            const shuffled = allQuestions.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        });
    },
};
