import { Request, Response, RequestHandler } from "express";
import Session from "../models/Session.model";
import Game from "../models/Game.model";
import User from "../models/user.model";
import { validateAndUpdateScore } from "../services/score.service";

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

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
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

    // Calculate new score
    const newTotalScore = user.stats.totalScore + score;

    // Validate and update score
    await validateAndUpdateScore(userId, newTotalScore);

    // Update total games played
    user.stats.totalGamesPlayed += 1;
    await user.save();

    res.status(201).json({ message: "Session saved", session: newSession });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error saving session:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: "Server error", error: "Unknown error" });
    }
  }
};
