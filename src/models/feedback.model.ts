import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  user: mongoose.Types.ObjectId; // The user who gave the feedback
  emoji: string; // The emoji feedback
  target: mongoose.Types.ObjectId; // The target (could be a product or another user)
  targetType: "user" | "product"; // Type of the target (user or product)
  timestamp: Date; // When the feedback was submitted
}

const FeedbackSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["user", "product"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
