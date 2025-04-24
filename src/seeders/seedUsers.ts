import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import connectDB from "../config/db";

dotenv.config();

const users = [
  {
    username: "gamerqueen",
    email: "gamerqueen@example.com",
    password: "password123",
    avatar: "https://example.com/avatar1.png",
    stats: {
      totalGamesPlayed: 25,
      totalScore: 9800,
      achievements: ["First Win", "Top Scorer"],
    },
  },
  {
    username: "proplayer",
    email: "proplayer@example.com",
    password: "password456",
    avatar: "https://example.com/avatar2.png",
    stats: {
      totalGamesPlayed: 40,
      totalScore: 15800,
      achievements: ["Champion", "Speed Runner"],
    },
  },
  {
    username: "casualchamp",
    email: "casualchamp@example.com",
    password: "password789",
    avatar: "https://example.com/avatar3.png",
    stats: {
      totalGamesPlayed: 10,
      totalScore: 4200,
      achievements: ["Rookie"],
    },
  },
];

async function seedUsers() {
  try {
    await connectDB();

    // Hash passwords
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await User.deleteMany({});
    await User.insertMany(hashedUsers);
    console.log(" User data seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding users:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedUsers();
