import { Request, Response, NextFunction } from "express";
import Session from "../models/Session.model";
import Game from "../models/Game.model";
import User from "../models/user.model";
import Leaderboard from "../models/Leaderboard.model";
import { validateAndUpdateScore } from "../services/score.service";
import { AppError } from "../utils/AppError";

export const saveSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, gameId, score, duration, difficulty, completed } = req.body;

  try {
    // Check if the user is authenticated
    if (!req.user || req.user.id !== userId) {
      return next(new AppError("Unauthorized access", 401));
    }

    // Check if the game exists
    const gameExists = await Game.findById(gameId);
    if (!gameExists) {
      return next(new AppError("Game not found", 404));
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Create a new session
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

    // Update or create the leaderboard score if the score qualifies
    await Leaderboard.findOneAndUpdate(
      { userId, gameId },
      { $max: { score } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Session saved", session: newSession });
  } catch (error) {
    next(error);
  }
};
