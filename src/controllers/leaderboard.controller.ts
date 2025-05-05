import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Leaderboard from "../models/Leaderboard.model";
import Game from "../models/Game.model";
import User from "../models/user.model";
import { AppError } from "../utils/AppError";

// GET leaderboard for a specific game with pagination (public)
export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    return next(new AppError("Invalid game ID", 400));
  }

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return next(new AppError("Page must be a positive number", 400));
  }

  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return next(new AppError("Limit must be a number between 1 and 100", 400));
  }

  try {
    const leaderboard = await Leaderboard.find({ gameId })
      .populate("userId", "username")
      .sort({ score: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    res.json(leaderboard);
  } catch (err) {
    next(new AppError("Failed to fetch leaderboard", 500));
  }
};

// POST a new score to the leaderboard (authenticated users only)
export const postScore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { gameId, score } = req.body;
    const userId = req.user?._id;

    // Validate user
    if (!userId) return next(new AppError("Unauthorized", 401));

    // Validate gameId format
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return next(new AppError("Invalid game ID", 400));
    }

    // Validate score
    if (typeof score !== "number" || score < 0) {
      return next(new AppError("Score must be a non-negative number", 400));
    }

    const game = await Game.findById(gameId);
    if (!game) return next(new AppError("Game not found", 404));

    const updatedScore = await Leaderboard.findOneAndUpdate(
      { gameId, userId },
      { $max: { score } },
      { upsert: true, new: true }
    );

    res.status(201).json(updatedScore);
  } catch (error) {
    next(error);
  }
};

// GET friend leaderboard for a specific game (filter by user's friends list)
export const getFriendLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user?._id;

  // Validate gameId format
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    return next(new AppError("Invalid game ID", 400));
  }

  // Validate page and limit
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return next(new AppError("Page must be a positive number", 400));
  }

  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return next(new AppError("Limit must be a number between 1 and 100", 400));
  }

  try {
    if (!userId) {
      return next(new AppError("Unauthorized", 401));
    }

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return next(new AppError("User not found", 404));
    }

    const friendsList = userDoc.friends || [];

    if (friendsList.length === 0) {
      res.status(200).json([]);
      return;
    }

    const leaderboard = await Leaderboard.find({
      gameId,
      userId: { $in: friendsList },
    })
      .populate("userId", "username")
      .sort({ score: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    res.json(leaderboard);
  } catch (err) {
    next(new AppError("Failed to fetch friend leaderboard", 500));
  }
};
