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
require("dotenv/config");
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
const questions = [
    {
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Port Harcourt", "Ibadan"],
        answer: "Abuja",
        category: "History",
    },
    {
        question: "Who sang the hit song 'Ojuelegba'?",
        options: ["Wizkid", "Davido", "Burna Boy", "Tiwa Savage"],
        answer: "Wizkid",
        category: "Music",
    },
    {
        question: "What does 'Sapa' mean in Nigerian slang?",
        options: ["Wealth", "Hunger", "Poverty", "Happiness"],
        answer: "Poverty",
        category: "Slang",
    },
];
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const batch = db.batch();
        const colRef = db.collection("questions");
        questions.forEach((q) => {
            const docRef = colRef.doc();
            batch.set(docRef, q);
        });
        yield batch.commit();
        console.log(" Questions seeded.");
    });
}
seed();
