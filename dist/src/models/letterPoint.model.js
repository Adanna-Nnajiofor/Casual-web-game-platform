"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetterPoint = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LetterPointSchema = new mongoose_1.default.Schema({
    letter: { type: String, required: true, unique: true },
    point: { type: Number, required: true }
});
exports.LetterPoint = mongoose_1.default.model('LetterPoint', LetterPointSchema);
