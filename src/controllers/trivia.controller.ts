import { Request, Response } from "express";
import { QuestionModel } from "../models/Question.model";
import { calculateTriviaScore } from "../utils/score.utils";

export const getQuestions = async (req: Request, res: Response) => {
  const { category = "Music", count = 5 } = req.query;
  try {
    const questions = await QuestionModel.getRandomQuestionsByCategory(
      String(category),
      Number(count)
    );
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions", error: err });
  }
};

export const submitAnswers = async (req: Request, res: Response) => {
  const { answers } = req.body;
  try {
    const results = await calculateTriviaScore(answers);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to calculate score", error: err });
  }
};
