import { Request, Response, NextFunction } from "express";
import {
  getLeaderboardService,
  postScoreService,
  getFriendLeaderboardService,
  getUserScoreService,
  getUserRankService,
  getGamesInLeaderboardService,
} from "../services/leaderboard.service";
import { AppError } from "../utils/AppError";

// Fetch the complete leaderboard for a specific game
export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;

  try {
    const leaderboard = await getLeaderboardService(gameId);
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

// Post a score for a user
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

// Get the full leaderboard of the user's friends
export const getFriendLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gameId } = req.params;
  const userId = req.user?._id;

  try {
    if (!userId) throw new AppError("Unauthorized", 401);

    const leaderboard = await getFriendLeaderboardService(gameId, userId);
    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};

// Get a specific user's score for a game
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

// Get a specific user's rank for a game
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

// Get all games
export const getGamesInLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const games = await getGamesInLeaderboardService();
    res.json(games);
  } catch (err) {
    next(err);
  }
};
