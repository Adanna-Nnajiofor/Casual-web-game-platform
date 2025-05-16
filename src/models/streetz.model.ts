import mongoose, { Schema, Document } from "mongoose";

export interface IStreetz extends Document {
  letterPoints: any;
  question: string;
  answer: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const StreetzSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Streetz = mongoose.model<IStreetz>("Streetz", StreetzSchema);

export default Streetz;
