import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import Leaderboard from "../models/Leaderboard.model";
import User from "../models/user.model";
import Game from "../models/Game.model";

dotenv.config();

const leaderboardData = [
  {
    user: "gamerqueen@example.com",
    game: "Memory Match",
    score: 850,
  },
  {
    user: "proplayer@example.com",
    game: "Speed Typing",
    score: 1200,
  },
  {
    user: "casualchamp@example.com",
    game: "Logic Puzzle",
    score: 950,
  },
];

async function seedLeaderboard() {
  try {
    await connectDB();

    const users = await User.find({
      email: { $in: leaderboardData.map((data) => data.user) },
    });
    const games = await Game.find({
      title: { $in: leaderboardData.map((data) => data.game) },
    });

    const leaderboardEntries = leaderboardData.map((entry) => {
      const user = users.find((u) => u.email === entry.user);
      const game = games.find((g) => g.title === entry.game);

      return {
        userId: user?._id,
        username: user?.username || "", // fallback for safety
        gameId: game?._id,
        score: entry.score,
      };
    });

    await Leaderboard.deleteMany({});
    await Leaderboard.insertMany(leaderboardEntries);
    console.log(" Leaderboard data seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding leaderboard:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedLeaderboard();
