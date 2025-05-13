"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = calculateScore;
function calculateScore(correctAnswer, playerAnswer, letterPoints) {
    if (playerAnswer.toLowerCase() !== correctAnswer.toLowerCase())
        return 0;
    return [...playerAnswer].reduce((acc, letter) => acc + (letterPoints[letter.toLowerCase()] || 0), 0);
}
