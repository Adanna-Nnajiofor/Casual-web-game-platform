import { QuestionModel } from "../models/Question.model";
import { calculateTriviaScore } from "../utils/score.utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: string;
}

export class TriviaService {
  // Fetch all questions
  static async fetchAllQuestions() {
    try {
      const allQuestions =
        (await QuestionModel.getAllQuestions()) as Question[];

      console.log(
        `Fetched all questions by category:`,
        allQuestions.reduce<Record<string, number>>((acc, q) => {
          acc[q.category] = (acc[q.category] || 0) + 1;
          return acc;
        }, {})
      );

      return allQuestions;
    } catch (error) {
      console.error("Error fetching all questions:", error);
      throw error;
    }
  }

  // Fetch questions by category
  static async fetchQuestionsByCategory(category: string) {
    try {
      const questions = (await QuestionModel.getAllQuestionsByCategory(
        category
      )) as Question[];
      console.log(
        `Fetched ${questions.length} questions for category: ${category}`
      );
      return questions;
    } catch (error) {
      console.error(
        `Error fetching questions for category ${category}:`,
        error
      );
      throw error;
    }
  }

  // Evaluate answers
  static async evaluateAnswers(
    answers: { questionId: string; selected: string }[]
  ) {
    try {
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
