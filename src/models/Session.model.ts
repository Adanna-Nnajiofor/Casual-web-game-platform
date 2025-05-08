import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  score: number;
  duration: number;
  difficulty: string;
  completed: boolean;
  startedAt: Date;
  endedAt?: Date;
  gameData?: Record<string, any>;
}

const SessionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      default: "Easy",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    endedAt: {
      type: Date,
    },
    gameData: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>("Session", SessionSchema);
