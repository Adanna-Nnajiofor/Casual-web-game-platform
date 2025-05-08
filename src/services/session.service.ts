import { Request } from "express";
import Session from "../models/Session.model";
import Game from "../models/Game.model";
import User from "../models/user.model";
import Leaderboard from "../models/Leaderboard.model";
import { AppError } from "../utils/AppError";
import { validateAndUpdateScore } from "./score.service";

// Create and save a session
export const createAndSaveSession = async (req: Request) => {
  const { userId, gameId, score, duration, difficulty, completed } = req.body;

  // Check if the user is authenticated
  if (!req.user || req.user.id !== userId) {
    throw new AppError("Unauthorized access", 401);
  }

  // Check if game exists
  const gameExists = await Game.findById(gameId);
  if (!gameExists) {
    throw new AppError("Game not found", 404);
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Create new session
  const newSession = new Session({
    userId,
    gameId,
    score,
    duration,
    difficulty,
    completed,
  });

  await newSession.save();

  // Calculate new total score
  const newTotalScore = user.stats.totalScore + score;

  // Validate and update score
  await validateAndUpdateScore(userId, newTotalScore, gameId);

  // Update total games played
  user.stats.totalGamesPlayed += 1;
  await user.save();

  // Update or create leaderboard
  await Leaderboard.findOneAndUpdate(
    { userId, gameId },
    { $max: { score } },
    { upsert: true, new: true }
  );

  return newSession;
};

// Fetch sessions by user ID
export const fetchSessionsByUser = async (userId: string) => {
  const sessions = await Session.find({ userId })
    .populate("gameId", "title type")
    .sort({ createdAt: -1 });

  if (!sessions.length) {
    throw new AppError("No sessions found for this user", 404);
  }

  return sessions;
};
