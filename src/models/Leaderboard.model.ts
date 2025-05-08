import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ILeaderboard extends Document {
  gameId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | IUser;
  score: number;
  username?: string;
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
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILeaderboard>("Leaderboard", leaderboardSchema);
