import { TriviaService } from "../../services/trivia.service";
import { QuestionModel } from "../../models/Question.model";
// import { admin } from "../../config/firebase-admin";
import { calculateTriviaScore } from "../../utils/score.utils";

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
      (QuestionModel.getRandomQuestions as jest.Mock).mockResolvedValue(
        mockQuestions
      );

      const result = await TriviaService.fetchAllQuestions(3);

      expect(QuestionModel.getRandomQuestions).toHaveBeenCalledWith(3);
      expect(result).toEqual(mockQuestions);
    });
  });

  describe("fetchQuestionsByCategory", () => {
    it("should return category-specific questions", async () => {
      const mockQuestions = [
        { id: "2", question: "Capital of France?", answer: "Paris" },
      ];
      (
        QuestionModel.getRandomQuestionsByCategory as jest.Mock
      ).mockResolvedValue(mockQuestions);

      const result = await TriviaService.fetchQuestionsByCategory(
        "Geography",
        2
      );

      expect(QuestionModel.getRandomQuestionsByCategory).toHaveBeenCalledWith(
        "Geography",
        2
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
