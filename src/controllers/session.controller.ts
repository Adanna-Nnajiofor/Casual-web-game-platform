import { Request, Response, RequestHandler } from "express";
import Session from "../models/Session.model";
import Game from "../models/Game.model";
import User from "../models/user.model";

// Save a game session
export const saveSession: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, gameId, score, duration, difficulty, completed } = req.body;

  try {
    // Check if the game exists
    const gameExists = await Game.findById(gameId);
    if (!gameExists) {
      res.status(404).json({ message: "Game not found" });
      return;
    }

    const newSession = new Session({
      userId,
      gameId,
      score,
      duration,
      difficulty,
      completed,
    });

    await newSession.save();

    // Update user stats
    const user = await User.findById(userId);
    if (user) {
      user.stats.totalGamesPlayed += 1;
      user.stats.totalScore += score;
      await user.save();
    }

    res.status(201).json({ message: "Session saved", session: newSession });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
