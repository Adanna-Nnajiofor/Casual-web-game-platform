import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  stats: {
    totalGamesPlayed: number;
    totalScore: number;
    achievements: string[];
  };
  friends: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    stats: {
      totalGamesPlayed: {
        type: Number,
        default: 0,
      },
      totalScore: {
        type: Number,
        default: 0,
      },
      achievements: {
        type: [String],
        default: [],
      },
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
