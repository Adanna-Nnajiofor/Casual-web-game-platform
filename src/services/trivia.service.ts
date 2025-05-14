import { QuestionModel } from "../models/Question.model";
import { calculateTriviaScore } from "../utils/score.utils";

export class TriviaService {
  // Fetch all random questions (any category)
  static async fetchAllQuestions(count: number) {
    return QuestionModel.getRandomQuestions(count);
  }

  // Fetch questions by category
  static async fetchQuestionsByCategory(category: string, count: number) {
    return QuestionModel.getRandomQuestionsByCategory(category, count);
  }

  // Evaluating answers and calculating the score using the calculateTriviaScore utility
  static async evaluateAnswers(
    answers: { questionId: string; selected: string }[]
  ) {
    try {
      // Call the calculateTriviaScore function to evaluate the answers
      const results = await calculateTriviaScore(answers);
      return results;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Failed to calculate score: " + error.message);
      } else {
        throw new Error("Failed to calculate score: Unknown error");
      }
    }
  }
}
