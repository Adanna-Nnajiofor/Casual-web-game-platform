import { Request, Response } from "express";
import { TriviaService } from "../services/trivia.service";

// Fetch questions for the game
export const getQuestions = async (req: Request, res: Response) => {
  const { category = "Music", count = 5 } = req.query;
  try {
    // Call TriviaService to fetch questions
    const questions = await TriviaService.fetchQuestions(
      String(category),
      Number(count)
    );
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions", error: err });
  }
};

// Submit answers and evaluate score
export const submitAnswers = async (req: Request, res: Response) => {
  const { answers } = req.body; // [{ questionId, selected }]
  try {
    // Call TriviaService to evaluate answers and calculate the score
    const results = await TriviaService.evaluateAnswers(answers);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate score", error: err });
  }
};
