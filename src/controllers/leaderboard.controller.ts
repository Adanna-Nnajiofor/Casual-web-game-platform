import { Request, Response } from "express";
import Leaderboard from "../models/Leaderboard.model";
import Game from "../models/Game.model";

// GET leaderboard for a specific game (public)
export const getLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { gameId } = req.params;
  try {
    const leaderboard = await Leaderboard.find({ gameId })
      .populate("userId", "username")
      .sort({ score: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

// POST a new score to the leaderboard (authenticated users only)
export const postScore = async (req: Request, res: Response): Promise<void> => {
  const { gameId, score } = req.body;
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { _id: userId, username } = req.user;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }

    const newScore = await Leaderboard.create({
      gameId,
      userId,
      username,
      score,
    });

    res.status(201).json(newScore);
  } catch (err: unknown) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
