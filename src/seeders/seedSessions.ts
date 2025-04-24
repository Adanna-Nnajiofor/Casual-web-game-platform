import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db";
import User from "../models/user.model";
import Game from "../models/Game.model";
import Session from "../models/Session.model";

dotenv.config();

async function seedSessions() {
  try {
    await connectDB();

    const users = await User.find({});
    const games = await Game.find({});

    if (users.length === 0 || games.length === 0) {
      console.error(" Users or Games not found. Please seed them first.");
      process.exit(1);
    }

    const sessionsData = [];

    // Generate 10 sessions
    for (let i = 0; i < 10; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const game = games[Math.floor(Math.random() * games.length)];

      // Generate random session data
      const startedAt = new Date();
      const duration = Math.floor(Math.random() * 600); // up to 10 mins
      const endedAt = new Date(startedAt.getTime() + duration * 1000); // End time after the duration

      sessionsData.push({
        userId: user._id,
        gameId: game._id,
        score: Math.floor(Math.random() * 1000),
        duration: duration,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)], // Random difficulty
        completed: Math.random() > 0.3, // 70% chance to complete the game
        startedAt: startedAt,
        endedAt: endedAt,
      });
    }

    await Session.deleteMany({});
    await Session.insertMany(sessionsData);
    console.log(" Game sessions seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding sessions:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedSessions();
