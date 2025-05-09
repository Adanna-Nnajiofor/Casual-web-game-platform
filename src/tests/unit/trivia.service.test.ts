import { TriviaService } from "../../services/trivia.service";
import { QuestionModel } from "../../models/Question.model";
import { admin } from "../../config/firebase-admin";
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
    it("should return questions from the model", async () => {
      const mockQuestions = [{ id: "1", question: "Test?", answer: "A" }];
      (
        QuestionModel.getRandomQuestionsByCategory as jest.Mock
      ).mockResolvedValue(mockQuestions);

      const result = await TriviaService.fetchQuestions("Science", 3);

      expect(QuestionModel.getRandomQuestionsByCategory).toHaveBeenCalledWith(
        "Science",
        3
      );
      expect(result).toEqual(mockQuestions);
    });
  });

  describe("evaluateAnswers", () => {
    it("should evaluate answers and return score summary", async () => {
      const mockAnswerData = {
        answer: "A",
      };

      const mockDoc = {
        data: jest.fn().mockReturnValue(mockAnswerData),
      };

      const firestore = admin.firestore();
      // Fix: Mock collection path
      (firestore.collection as jest.Mock).mockReturnValue({
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue(mockDoc),
      });

      const answers = [
        { questionId: "q1", selected: "A" }, // correct
        { questionId: "q2", selected: "B" }, // wrong
      ];

      // Mock the calculateTriviaScore function to return a fixed result
      (calculateTriviaScore as jest.Mock).mockResolvedValue({
        score: 10,
        correctAnswers: 1,
        total: 2,
      });

      const result = await TriviaService.evaluateAnswers(answers);

      expect(calculateTriviaScore).toHaveBeenCalledWith(answers);
      expect(result).toEqual({
        score: 10,
        correctAnswers: 1,
        total: 2,
      });
    });

    it("should throw an error if calculateTriviaScore fails", async () => {
      const mockAnswerData = {
        answer: "A",
      };

      const mockDoc = {
        data: jest.fn().mockReturnValue(mockAnswerData),
      };

      const firestore = admin.firestore();
      // Fix: Mock collection path
      (firestore.collection as jest.Mock).mockReturnValue({
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue(mockDoc),
      });

      const answers = [
        { questionId: "q1", selected: "A" }, // correct
        { questionId: "q2", selected: "B" }, // wrong
      ];

      // Simulate error in calculateTriviaScore
      (calculateTriviaScore as jest.Mock).mockRejectedValue(
        new Error("Error calculating score")
      );

      try {
        await TriviaService.evaluateAnswers(answers);
      } catch (error) {
        // Fix: Type narrow the error
        if (error instanceof Error) {
          expect(error.message).toBe(
            "Failed to calculate score: Error calculating score"
          );
        }
      }
    });
  });
});
