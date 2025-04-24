import dotenv from "dotenv";
import mongoose from "mongoose";
import slugify from "slugify";
import Game from "../models/Game.model";
import connectDB from "../config/db";

dotenv.config();

const games = [
  {
    title: "Memory Match",
    description: "Test your memory with this fun game!",
    difficultyLevels: ["Easy", "Medium", "Hard"],
    isWeb3Enabled: false,
    assets: {
      coverImage: "https://example.com/memory.jpg",
      trailerUrl: "https://example.com/memory-trailer.mp4",
    },
  },
  {
    title: "Speed Typing",
    description: "Type fast and accurately to win.",
    difficultyLevels: ["Easy", "Medium"],
    isWeb3Enabled: false,
    assets: {
      coverImage: "https://example.com/typing.jpg",
      trailerUrl: "https://example.com/typing-trailer.mp4",
    },
  },
  {
    title: "Logic Puzzle",
    description: "Challenge your brain with logic games.",
    difficultyLevels: ["Medium", "Hard"],
    isWeb3Enabled: true,
    assets: {
      coverImage: "https://example.com/puzzle.jpg",
      trailerUrl: "https://example.com/puzzle-trailer.mp4",
    },
  },
];

const gameDataWithSlugs = games.map((game) => ({
  ...game,
  slug: slugify(game.title, { lower: true }),
}));

async function seedGames() {
  try {
    await connectDB();
    await Game.deleteMany({});
    await Game.insertMany(gameDataWithSlugs);
    console.log(" Game data seeded successfully");

    // Gracefully close the connection
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(" Seeding error:", err);

    // Attempt graceful shutdown even on failure
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedGames();
