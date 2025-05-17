import mongoose, { Schema, Document } from "mongoose";

export interface StreetzWordType extends Document {
  word: string;
  category: string;
  description: string;
}

const streetzSchema = new Schema<StreetzWordType>({
  word: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

const StreetzWord = mongoose.model<StreetzWordType>(
  "StreetzWord",
  streetzSchema
);

export default StreetzWord;
