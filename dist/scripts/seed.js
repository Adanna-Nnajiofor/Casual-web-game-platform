"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/seed.ts
const mongoose_1 = __importDefault(require("mongoose"));
const streetz_model_1 = __importDefault(require("../models/streetz.model"));
const letterPoint_model_1 = require("../models/letterPoint.model");
const db_1 = __importDefault(require("../config/db"));
async function seed() {
    await (0, db_1.default)();
    await streetz_model_1.default.create({
        questionText: "Capital of France",
        answer: "paris",
        scrambled: ["p", "a", "r", "i", "s"],
    });
    const letterPoints = [
        { letter: "a", point: 2 },
        { letter: "b", point: 4 },
        { letter: "c", point: 3 },
        { letter: "d", point: 1 },
        { letter: "e", point: 5 },
        { letter: "f", point: 2 },
        { letter: "g", point: 4 },
        { letter: "h", point: 3 },
        { letter: "i", point: 1 },
        { letter: "j", point: 6 },
        { letter: "k", point: 3 },
        { letter: "l", point: 2 },
        { letter: "m", point: 4 },
        { letter: "n", point: 1 },
        { letter: "o", point: 5 },
        { letter: "p", point: 3 },
        { letter: "q", point: 10 },
        { letter: "r", point: 2 },
        { letter: "s", point: 1 },
        { letter: "t", point: 2 },
        { letter: "u", point: 4 },
        { letter: "v", point: 6 },
        { letter: "w", point: 4 },
        { letter: "x", point: 7 },
        { letter: "y", point: 3 },
        { letter: "z", point: 9 },
    ];
    await letterPoint_model_1.LetterPoint.insertMany(letterPoints);
    console.log(" Seeded Streetz questions and letter points");
    mongoose_1.default.disconnect();
}
seed();
