"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { calculateScore } from "../utils/streetzScore";
// import type { LetterPointMap } from "../types/streetz";
// import { LetterPoint } from "../models/letterPoint.model";
const streetz_controller_1 = require("../controllers/streetz.controller");
const router = (0, express_1.Router)();
// GET a question
router.get("/question", streetz_controller_1.getQuestion);
// GET letter points
router.get("/question/letter-points", streetz_controller_1.getLetterPoints);
// POST submit answer
router.post("/submit-answer", streetz_controller_1.submitAnswer);
exports.default = router;
