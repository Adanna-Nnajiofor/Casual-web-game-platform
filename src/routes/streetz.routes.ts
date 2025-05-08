import { Router, Request, Response } from 'express';
import { Question } from '../models/question.model';
import { calculateScore } from '../utils/streetzScore';
import type { LetterPointMap } from '../types/streetz';
import { LetterPoint } from '../models/letterPoint.model';
import {
  getQuestion,
  getLetterPoints,
  submitAnswer
} from '../controllers/streetz.controller';

const router: Router = Router();

// GET a question
router.get('/question', getQuestion);

// GET letter points
router.get('/question/letter-points', getLetterPoints);

// POST submit answer
router.post('/submit-answer', submitAnswer);

export default router;
