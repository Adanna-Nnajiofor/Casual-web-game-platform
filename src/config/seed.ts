import mongoose from "mongoose";
import Game from "../models/Game.model";

export const seedGames = async () => {
  try {
    // Clear existing games
    await Game.deleteMany({});

    // Add sample games
    const games = [
      {
        title: "Trivia Master",
        description: "Test your knowledge across various categories!",
        slug: "trivia-master",
        type: "trivia",
        difficultyLevels: ["Easy", "Medium", "Hard"],
        isWeb3Enabled: false,
        assets: {
          coverImage: "https://example.com/trivia-cover.jpg",
        },
      },
      {
        title: "Streetz Runner",
        description: "Run through the streets avoiding obstacles!",
        slug: "streetz-runner",
        type: "streetz",
        difficultyLevels: ["Easy", "Medium", "Hard"],
        isWeb3Enabled: false,
        assets: {
          coverImage: "https://example.com/streetz-cover.jpg",
        },
      },
      {
        title: "Crypto Quest",
        description: "Explore the world of Web3 gaming!",
        slug: "crypto-quest",
        type: "web3",
        difficultyLevels: ["Beginner", "Advanced"],
        isWeb3Enabled: true,
        assets: {
          coverImage: "https://example.com/crypto-cover.jpg",
        },
      },
    ];

    await Game.insertMany(games);
    console.log("Sample games seeded successfully!");
  } catch (error) {
    console.error("Error seeding games:", error);
  }
};
