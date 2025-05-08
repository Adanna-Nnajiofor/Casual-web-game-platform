import mongoose from 'mongoose';

const LetterPointSchema = new mongoose.Schema({
  letter: { type: String, required: true, unique: true },
  point: { type: Number, required: true }
});

export const LetterPoint = mongoose.model('LetterPoint', LetterPointSchema);
