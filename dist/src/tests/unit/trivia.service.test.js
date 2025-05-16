"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trivia_service_1 = require("../../services/trivia.service");
const Question_model_1 = require("../../models/Question.model");
// import { admin } from "../../config/firebase-admin";
const score_utils_1 = require("../../utils/score.utils");
// Mock Firestore
jest.mock("../../config/firebase-admin", () => {
    return {
        admin: {
            firestore: jest.fn(() => ({
                collection: jest.fn().mockReturnThis(),
                doc: jest.fn().mockReturnThis(),
                get: jest.fn(),
            })),
        },
    };
});
// Mock QuestionModel
jest.mock("../../models/Question.model.ts", () => ({
    QuestionModel: {
        getRandomQuestions: jest.fn(),
        getRandomQuestionsByCategory: jest.fn(),
    },
}));
// Mock calculateTriviaScore
jest.mock("../../utils/score.utils", () => ({
    calculateTriviaScore: jest.fn(),
}));
describe("TriviaService", () => {
    describe("fetchAllQuestions", () => {
        it("should return all questions if no category is provided", async () => {
            const mockQuestions = [
                { id: "1", question: "What is 2+2?", answer: "4" },
            ];
            Question_model_1.QuestionModel.getRandomQuestions.mockResolvedValue(mockQuestions);
            const result = await trivia_service_1.TriviaService.fetchAllQuestions(3);
            expect(Question_model_1.QuestionModel.getRandomQuestions).toHaveBeenCalledWith(3);
            expect(result).toEqual(mockQuestions);
        });
    });
    describe("fetchQuestionsByCategory", () => {
        it("should return category-specific questions", async () => {
            const mockQuestions = [
                { id: "2", question: "Capital of France?", answer: "Paris" },
            ];
            Question_model_1.QuestionModel.getRandomQuestionsByCategory.mockResolvedValue(mockQuestions);
            const result = await trivia_service_1.TriviaService.fetchQuestionsByCategory("Geography", 2);
            expect(Question_model_1.QuestionModel.getRandomQuestionsByCategory).toHaveBeenCalledWith("Geography", 2);
            expect(result).toEqual(mockQuestions);
        });
    });
    describe("evaluateAnswers", () => {
        it("should evaluate answers and return the score summary", async () => {
            const mockAnswers = [
                { questionId: "q1", selected: "A" },
                { questionId: "q2", selected: "B" },
            ];
            const mockScoreResult = {
                score: 20,
                correctAnswers: 2,
                total: 2,
            };
            score_utils_1.calculateTriviaScore.mockResolvedValue(mockScoreResult);
            const result = await trivia_service_1.TriviaService.evaluateAnswers(mockAnswers);
            expect(score_utils_1.calculateTriviaScore).toHaveBeenCalledWith(mockAnswers);
            expect(result).toEqual(mockScoreResult);
        });
        it("should throw an error if score calculation fails", async () => {
            const answers = [
                { questionId: "q1", selected: "A" },
                { questionId: "q2", selected: "C" },
            ];
            score_utils_1.calculateTriviaScore.mockRejectedValue(new Error("Score calc failed"));
            await expect(trivia_service_1.TriviaService.evaluateAnswers(answers)).rejects.toThrow("Failed to calculate score: Score calc failed");
        });
    });
});
