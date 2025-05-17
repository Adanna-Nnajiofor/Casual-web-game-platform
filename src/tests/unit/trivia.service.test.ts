import { TriviaService } from "../../services/trivia.service";
import { QuestionModel } from "../../models/Question.model";
import { calculateTriviaScore } from "../../utils/score.utils";

// Mock Firestore (optional – remove if not used directly)
jest.mock("../../config/firebase-admin", () => ({
  admin: {
    firestore: jest.fn(() => ({
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
    })),
  },
}));

// Mock QuestionModel
jest.mock("../../models/Question.model.ts", () => ({
  QuestionModel: {
    getAllQuestions: jest.fn(),
    getAllQuestionsByCategory: jest.fn(),
  },
}));

// Mock calculateTriviaScore
jest.mock("../../utils/score.utils", () => ({
  calculateTriviaScore: jest.fn(),
}));

describe("TriviaService", () => {
  describe("fetchAllQuestions", () => {
    it("should return all questions", async () => {
      const mockQuestions = [
        {
          id: "1",
          question: "What is 2+2?",
          options: ["1", "2", "3", "4"],
          answer: "4",
          category: "Math",
        },
      ];

      (QuestionModel.getAllQuestions as jest.Mock).mockResolvedValue(
        mockQuestions
      );

      const result = await TriviaService.fetchAllQuestions();

      expect(QuestionModel.getAllQuestions).toHaveBeenCalled();
      expect(result).toEqual(mockQuestions);
    });
  });

  describe("fetchQuestionsByCategory", () => {
    it("should return category-specific questions", async () => {
      const mockQuestions = [
        {
          id: "2",
          question: "Capital of France?",
          options: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
          category: "Geography",
        },
      ];

      (QuestionModel.getAllQuestionsByCategory as jest.Mock).mockResolvedValue(
        mockQuestions
      );

      const result = await TriviaService.fetchQuestionsByCategory("Geography");

      expect(QuestionModel.getAllQuestionsByCategory).toHaveBeenCalledWith(
        "Geography"
      );
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

      (calculateTriviaScore as jest.Mock).mockResolvedValue(mockScoreResult);

      const result = await TriviaService.evaluateAnswers(mockAnswers);

      expect(calculateTriviaScore).toHaveBeenCalledWith(mockAnswers);
      expect(result).toEqual(mockScoreResult);
    });

    it("should throw an error if score calculation fails", async () => {
      const answers = [
        { questionId: "q1", selected: "A" },
        { questionId: "q2", selected: "C" },
      ];

      (calculateTriviaScore as jest.Mock).mockRejectedValue(
        new Error("Score calc failed")
      );

      await expect(TriviaService.evaluateAnswers(answers)).rejects.toThrow(
        "Failed to calculate score: Score calc failed"
      );
    });
  });
});
