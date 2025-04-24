import mongoose, { Schema, Document } from "mongoose";

export interface ILeaderboard extends Document {
  gameId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  score: number;
  username?: string; // Optional, if denormalized data is preferred
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    username: {
      type: String, // Optional for performance (denormalization)
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeaderboard>("Leaderboard", leaderboardSchema);
