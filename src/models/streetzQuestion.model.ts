import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for a Streetz question document
export interface IStreetzQuestion extends Document {
  questionText: string;
  answer: string;
  scrambled: string[];
}

// Create the schema
const streetzQuestionSchema = new Schema<IStreetzQuestion>({
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
  scrambled: { type: [String], required: true },
});

// Export the Mongoose model
export const StreetzQuestionModel: Model<IStreetzQuestion> =
  mongoose.model<IStreetzQuestion>("StreetzQuestion", streetzQuestionSchema);
