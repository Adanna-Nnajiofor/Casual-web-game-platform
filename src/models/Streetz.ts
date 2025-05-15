// models/streetz.ts
import mongoose, { Schema, Document } from 'mongoose';

interface StreetzWordType extends Document {
  word: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const streetzSchema = new Schema<StreetzWordType>({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
});

const StreetzWord = mongoose.model<StreetzWordType>('StreetzWord', streetzSchema);
export default StreetzWord;
