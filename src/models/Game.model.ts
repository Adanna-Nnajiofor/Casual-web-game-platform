import mongoose, { Document, Schema } from "mongoose";

export interface IGame extends Document {
  title: string;
  description: string;
  slug: string;
  difficultyLevels: string[];
  isWeb3Enabled: boolean;
  assets?: {
    coverImage?: string;
    trailerUrl?: string;
  };
}

const GameSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    difficultyLevels: {
      type: [String],
      default: ["Easy", "Medium", "Hard"],
    },
    isWeb3Enabled: {
      type: Boolean,
      default: false,
    },
    assets: {
      coverImage: {
        type: String,
        default: "",
      },
      trailerUrl: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IGame>("Game", GameSchema);
