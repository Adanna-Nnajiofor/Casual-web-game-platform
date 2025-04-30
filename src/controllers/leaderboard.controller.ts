import { Request, Response } from "express";
import Leaderboard from "../models/Leaderboard.model";
import Game from "../models/Game.model";
import User from "../models/user.model";

// GET leaderboard for a specific game with pagination (public)
export const getLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit to 10

  try {
    const leaderboard = await Leaderboard.find({ gameId })
      .populate("userId", "username")
      .sort({ score: -1 })
      .skip((Number(page) - 1) * Number(limit)) // Pagination logic
      .limit(Number(limit)); // Limit results

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

// GET friend leaderboard for a specific game (filter by user's friends list)
export const getFriendLeaderboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit to 10
  const { _id: userId } = req.user; // Get the user ID of the authenticated user

  try {
    // Fetch the authenticated user's details from the database
    const userDoc = await User.findById(userId);
    if (!userDoc) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Get the user's friends list
    const friendsList = userDoc.friends || [];

    // If the user has no friends, return an empty leaderboard
    if (friendsList.length === 0) {
      res.status(200).json([]);
      return;
    }

    // Fetch leaderboard data of only the friends
    const leaderboard = await Leaderboard.find({
      gameId,
      userId: { $in: friendsList },
    })
      .populate("userId", "username") // Populate username field from the User model
      .sort({ score: -1 }) // Sort by score descending
      .skip((Number(page) - 1) * Number(limit)) // Pagination logic
      .limit(Number(limit)); // Limit results

    res.json(leaderboard);
  } catch (err) {
    if (err instanceof Error) {
      // Check if error is an instance of Error
      res.status(500).json({
        message: "Failed to fetch friend leaderboard",
        error: err.message,
      });
    } else {
      // Fallback for unexpected error types
      res.status(500).json({
        message: "Failed to fetch friend leaderboard",
        error: "An unknown error occurred",
      });
    }
  }
};
