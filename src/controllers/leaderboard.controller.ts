import { Request, Response, NextFunction } from "express";
import {
  getLeaderboardService,
  postScoreService,
  getFriendLeaderboardService,
  getUserScoreService,
  getUserRankService,
} from "../services/leaderboard.service";
import { AppError } from "../utils/AppError";

// Controller to fetch the leaderboard for a specific game, with pagination support
export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    // Validate pagination parameters
    if (
      isNaN(parsedPage) ||
      parsedPage < 1 ||
      isNaN(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      throw new AppError("Invalid pagination parameters", 400);
    }

    // Fetch the leaderboard from the service
    const leaderboard = await getLeaderboardService(
      gameId,
      parsedPage,
      parsedLimit
    );

    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

// Controller to post a score for a user in a specific game
export const postScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { gameId, score } = req.body;
    const userId = req.user?._id;

    if (!userId) throw new AppError("Unauthorized", 401);

    const updatedScore = await postScoreService(gameId, score, userId);
    res.status(201).json(updatedScore);
  } catch (err) {
    next(err);
  }
};

// Controller to get the leaderboard for the user's friends
export const getFriendLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user?._id;

  try {
    if (!userId) throw new AppError("Unauthorized", 401);

    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    // Validate pagination parameters
    if (
      isNaN(parsedPage) ||
      parsedPage < 1 ||
      isNaN(parsedLimit) ||
      parsedLimit < 1 ||
      parsedLimit > 100
    ) {
      throw new AppError("Invalid pagination parameters", 400);
    }

    // Fetch the friend's leaderboard from the service
    const leaderboard = await getFriendLeaderboardService(
      gameId,
      parsedPage,
      parsedLimit,
      userId
    );

    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

// Controller to fetch the score of a specific user for a game
export const getUserScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;
  const userId = req.user?._id;

  try {
    if (!userId) throw new AppError("Unauthorized", 401);
    const data = await getUserScoreService(gameId, userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// Controller to fetch the rank of a specific user for a game
export const getUserRank = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;
  const userId = req.user?._id;

  try {
    if (!userId) throw new AppError("Unauthorized", 401);
    const rankData = await getUserRankService(gameId, userId);
    res.json(rankData);
  } catch (err) {
    next(err);
  }
};
