import mongoose from "mongoose";
import Leaderboard from "../models/Leaderboard.model";
import Game from "../models/Game.model";
import User, { IUser } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { buildLeaderboardPipeline } from "./leaderboard.pipeline";
import { LeaderboardEntry } from "./types";

export const getLeaderboardService = async (
  gameId: string,
  userId?: string
): Promise<LeaderboardEntry[] | LeaderboardEntry> => {
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    throw new AppError("Invalid game ID", 400);
  }

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const pipeline = buildLeaderboardPipeline(gameId, userId);
  const result = await Leaderboard.aggregate(pipeline);

  if (!result.length) {
    throw new AppError(
      userId
        ? "User not found on leaderboard"
        : "No entries found for this game",
      404
    );
  }

  return userId ? result[0] : result;
};

export const postScoreService = async (
  gameId: string,
  score: number,
  userId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    throw new AppError("Invalid game ID", 400);
  }

  if (typeof score !== "number" || score < 0) {
    throw new AppError("Score must be a non-negative number", 400);
  }

  const game = await Game.findById(gameId);
  if (!game) throw new AppError("Game not found", 404);

  return await Leaderboard.findOneAndUpdate(
    { gameId, userId },
    { $max: { score } },
    { upsert: true, new: true }
  );
};

export const getFriendLeaderboardService = async (
  gameId: string,
  userId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    throw new AppError("Invalid game ID", 400);
  }

  const userDoc = await User.findById(userId);
  if (!userDoc) throw new AppError("User not found", 404);

  const friendsList = userDoc.friends || [];
  if (friendsList.length === 0) return [];

  return await Leaderboard.find({ gameId, userId: { $in: friendsList } })
    .populate<{ userId: IUser }>("userId", "username")
    .sort({ score: -1 });
};

export const getUserScoreService = async (gameId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    throw new AppError("Invalid game ID", 400);
  }

  const entry = await Leaderboard.findOne({ gameId, userId })
    .populate<{ userId: IUser }>("userId", "username")
    .select("score userId");

  if (!entry || !entry.userId) {
    throw new AppError("User not found on leaderboard for this game", 404);
  }

  return {
    username: (entry.userId as IUser).username,
    score: entry.score,
  };
};

export const getUserRankService = async (gameId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    throw new AppError("Invalid game ID", 400);
  }

  const leaderboard = await Leaderboard.find({ gameId })
    .populate<{ userId: IUser }>("userId", "username")
    .sort({ score: -1 });

  const index = leaderboard.findIndex(
    (entry) =>
      typeof entry.userId === "object" &&
      "_id" in entry.userId &&
      entry.userId._id.toString() === userId.toString()
  );

  if (index === -1) throw new AppError("User not found on leaderboard", 404);

  return {
    username: (leaderboard[index].userId as IUser).username,
    rank: index + 1,
    score: leaderboard[index].score,
  };
};
