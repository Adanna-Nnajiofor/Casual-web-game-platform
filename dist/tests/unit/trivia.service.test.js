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
const trivia_service_1 = require("../../services/trivia.service");
const Question_model_1 = require("../../models/Question.model");
const firebase_admin_1 = require("../../config/firebase-admin");
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
jest.mock("../../models/Question.model", () => ({
    QuestionModel: {
        getRandomQuestionsByCategory: jest.fn(),
    },
}));
// Mock calculateTriviaScore utility function
jest.mock("../../utils/score.utils", () => ({
    calculateTriviaScore: jest.fn(),
}));
describe("TriviaService", () => {
    describe("fetchQuestions", () => {
        it("should return questions from the model", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockQuestions = [{ id: "1", question: "Test?", answer: "A" }];
            Question_model_1.QuestionModel.getRandomQuestionsByCategory.mockResolvedValue(mockQuestions);
            const result = yield trivia_service_1.TriviaService.fetchQuestions("Science", 3);
            expect(Question_model_1.QuestionModel.getRandomQuestionsByCategory).toHaveBeenCalledWith("Science", 3);
            expect(result).toEqual(mockQuestions);
        }));
    });
    describe("evaluateAnswers", () => {
        it("should evaluate answers and return score summary", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAnswerData = {
                answer: "A",
            };
            const mockDoc = {
                data: jest.fn().mockReturnValue(mockAnswerData),
            };
            const firestore = firebase_admin_1.admin.firestore();
            // Fix: Mock collection path
            firestore.collection.mockReturnValue({
                doc: jest.fn().mockReturnThis(),
                get: jest.fn().mockResolvedValue(mockDoc),
            });
            const answers = [
                { questionId: "q1", selected: "A" }, // correct
                { questionId: "q2", selected: "B" }, // wrong
            ];
            // Mock the calculateTriviaScore function to return a fixed result
            score_utils_1.calculateTriviaScore.mockResolvedValue({
                score: 10,
                correctAnswers: 1,
                total: 2,
            });
            const result = yield trivia_service_1.TriviaService.evaluateAnswers(answers);
            expect(score_utils_1.calculateTriviaScore).toHaveBeenCalledWith(answers);
            expect(result).toEqual({
                score: 10,
                correctAnswers: 1,
                total: 2,
            });
        }));
        it("should throw an error if calculateTriviaScore fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAnswerData = {
                answer: "A",
            };
            const mockDoc = {
                data: jest.fn().mockReturnValue(mockAnswerData),
            };
            const firestore = firebase_admin_1.admin.firestore();
            // Fix: Mock collection path
            firestore.collection.mockReturnValue({
                doc: jest.fn().mockReturnThis(),
                get: jest.fn().mockResolvedValue(mockDoc),
            });
            const answers = [
                { questionId: "q1", selected: "A" }, // correct
                { questionId: "q2", selected: "B" }, // wrong
            ];
            // Simulate error in calculateTriviaScore
            score_utils_1.calculateTriviaScore.mockRejectedValue(new Error("Error calculating score"));
            try {
                yield trivia_service_1.TriviaService.evaluateAnswers(answers);
            }
            catch (error) {
                // Fix: Type narrow the error
                if (error instanceof Error) {
                    expect(error.message).toBe("Failed to calculate score: Error calculating score");
                }
            }
        }));
    });
});
