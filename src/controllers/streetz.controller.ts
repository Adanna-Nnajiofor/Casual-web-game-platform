import { Request, Response } from "express";
import { QuestionModel } from "../models/Question.model";
import { calculateScore } from "../utils/streetzScore";
import { LetterPointMap } from "../types/streetz";
import { LetterPoint } from "../models/letterPoint.model";
import { admin } from "../config/firebase-admin";
import { getARandomQuestion, seedNigerianQuestions } from "../services/streetz.service";
import { isValidSlang } from "../utils/slangValidator";

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

export async function seedQuestions(req: Request, res: Response): Promise<void> {
  try {
    // Call the seedNigerianQuestions function to seed questions
    const seededQuestions = await seedNigerianQuestions();

    // Log the seeded questions for debugging purposes
    console.log("Seeded Questions:", seededQuestions);

    res.json({
      status: true,
      message: "Questions seeded successfully",
      seededQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to seed questions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Define the Question type
interface Question {
  id: string;
  questionText: string;
  answer: string;
}

// GET a question
export async function getQuestion(req: Request, res: Response): Promise<void> {
  try {
    console.log(1)
    // Fetch a random question (category can be adjusted as needed)
    const question = await getARandomQuestion()
    console.log(2)
    // If no questions are found
    if (!question) {
      console.log(3)
      res.status(404).json({ error: "No questions found" });
      return;
    }

    // Ensure the question has the required fields

    console.log(4)
    // If questionText or answer is missing, handle it
    if (!question.question || !question.answer) {
      console.log(5)
      res.status(500).json({ error: "Invalid question data" });
      return;
    }

    console.log(6)
    res.status(200).json({
      status: true,
      question
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question", details: error });
  }
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
export async function submitAnswer(req: Request, res: Response): Promise<void> {
  const { questionId, playerAnswer } = req.body;

  if (!questionId || !playerAnswer) {
    res.status(400).json({ error: "Missing questionId or playerAnswer" });
    return;
  }

  try {
    const snapshot = await questionsCollection.doc(questionId).get();
    const question = snapshot.data();

    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const typedQuestion = question as { answer: string; questionText: string };

    const isValid = await isValidSlang(playerAnswer);

    if (!isValid) {
      res.status(400).json({
        valid: false,
        message: "No be am!",
        score: 0,
        correctAnswer: typedQuestion.answer,
      });
      return;
    }

    const score = calculateScore(
      typedQuestion.answer,
      playerAnswer,
      letterPoints
    );

    res.json({
      valid: true,
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
