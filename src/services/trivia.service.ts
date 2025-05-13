import { QuestionModel } from "../models/Question.model";
import { calculateTriviaScore } from "../utils/score.utils";

export class TriviaService {
  // Fetching random questions by category and count
  static async fetchQuestions(category: string, count: number) {
    if (category) {
      console.log("Fetching questions for category:", category);
      // Fetch questions by the category if a category is specified
      return QuestionModel.getRandomQuestionsByCategory(category, count);
    } else {
      console.log("Fetching all questions without category filter");
      // Fetch all questions if no category is specified
      return QuestionModel.getAllQuestions(count);
    }
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
