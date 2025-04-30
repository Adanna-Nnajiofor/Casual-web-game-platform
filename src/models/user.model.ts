import mongoose, { Document, Schema } from "mongoose";

// Define the TypeScript interface for User
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
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
  flags?: {
    type: string;
    reason: string;
    timestamp: Date;
  }[];
}

// Define the Mongoose schema
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
    flags: [
      {
        type: {
          type: String,
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model<IUser>("User", UserSchema);
