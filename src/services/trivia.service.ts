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
  // Fetch all random questions (any category)
  static async fetchAllQuestions(count: number) {
    try {
      // First get all available categories
      const allQuestions = (await QuestionModel.getRandomQuestions(
        100
      )) as Question[]; // Get more questions initially
      const categories = [...new Set(allQuestions.map((q) => q.category))];

      // Calculate how many questions to get per category
      const questionsPerCategory = Math.ceil(count / categories.length);

      let finalQuestions: Question[] = [];
      for (const category of categories) {
        const categoryQuestions =
          (await QuestionModel.getRandomQuestionsByCategory(
            category,
            questionsPerCategory
          )) as Question[];
        finalQuestions = [...finalQuestions, ...categoryQuestions];
      }

      // Shuffle the final array and limit to requested count
      finalQuestions = finalQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

      console.log(
        `Fetched questions by category:`,
        finalQuestions.reduce<Record<string, number>>((acc, q) => {
          acc[q.category] = (acc[q.category] || 0) + 1;
          return acc;
        }, {})
      );

      return finalQuestions;
    } catch (error) {
      console.error("Error fetching all questions:", error);
      throw error;
    }
  }

  // Fetch questions by category
  static async fetchQuestionsByCategory(category: string, count: number) {
    try {
      const questions = (await QuestionModel.getRandomQuestionsByCategory(
        category,
        count
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
