import mongoose, { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for User
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  provider: "google" | "facebook" | "local";
  avatar?: string;
  firebaseUid: string; // Firebase user ID (for social logins)
  lastLogin: Date;
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

// Define the Mongoose schema for User
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
    },
    provider: {
      type: String,
      enum: ["google", "facebook", "local"],
      default: "local",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    firebaseUid: {
      type: String,
      unique: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
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

// Create and export the User model
const User = model<IUser>("User", UserSchema);

export default User;
