// models/Question.ts
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  scrambled: { type: [String], required: true }
});

export const Question = mongoose.model('Question', QuestionSchema);