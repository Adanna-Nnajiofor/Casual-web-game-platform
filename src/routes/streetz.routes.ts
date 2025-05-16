import { Router } from "express";

// import { calculateScore } from "../utils/streetzScore";
// import type { LetterPointMap } from "../types/streetz";
// import { LetterPoint } from "../models/letterPoint.model";
import {
  getQuestion,
  getLetterPoints,
  submitAnswer,
  seedQuestions,
} from "../controllers/streetz.controller";

const router: Router = Router();

//create a question
router.post("/create/question", seedQuestions);

// GET a question
router.get("/question", getQuestion);

// GET letter points
router.get("/question/letter-points", getLetterPoints);

// POST submit answer
router.post("/submit-answer", submitAnswer);

export default router;
