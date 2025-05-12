import { Request, Response } from "express";
import { QuestionModel } from "../models/question.model";
import { calculateScore } from "../utils/streetzScore";
import { LetterPointMap } from "../types/streetz";
import { LetterPoint } from "../models/letterPoint.model";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();
const questionsCollection = db.collection("questions");

const letterPoints: LetterPointMap = {
  a: 2,
  b: 4,
  c: 3,
  d: 1,
  e: 5,
  f: 2,
  g: 4,
  h: 3,
  i: 1,
  j: 6,
  k: 3,
  l: 2,
  m: 4,
  n: 1,
  o: 5,
  p: 3,
  q: 10,
  r: 2,
  s: 1,
  t: 2,
  u: 4,
  v: 6,
  w: 4,
  x: 7,
  y: 3,
  z: 9,
};

// Define the Question type
interface Question {
  id: string;
  questionText: string;
  answer: string;
}

// GET a question
export async function getQuestion(req: Request, res: Response): Promise<Response> {
  const question = await Question.findOne();
  if (!question) return res.status(404).json({ error: 'No questions found' });

  return res.json({
    id: question.id,
    questionText: question.questionText,
  });
}

// GET letter points
export async function getLetterPoints(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const letters = await LetterPoint.find();
    const letterPoints = Object.fromEntries(
      letters.map((l) => [l.letter.toLowerCase(), l.point])
    );
    res.json(letterPoints);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch letter points", details: error });
  }
}

// POST submit answer
export async function submitAnswer(req: Request, res: Response): Promise<Response> {
    const { questionId, playerAnswer } = req.body;
// Validate input
if (!questionId || !playerAnswer) {
    return res.status(400).json({ error: 'Missing questionId or playerAnswer' });
}
    try {
        // Add logic to process the answer submission here
        // Fetch the question from the database
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

    // Calculate the score for the player's answer
    const score = calculateScore(
      typedQuestion.answer,
      playerAnswer,
      letterPoints
    );

    // Respond with the calculated score and the correct answer
    res.json({
      correctAnswer: typedQuestion.answer,
      playerAnswer,
      score,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while submitting the answer",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
