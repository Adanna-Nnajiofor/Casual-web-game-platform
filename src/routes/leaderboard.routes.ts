import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getLeaderboard,
  postScore,
  getFriendLeaderboard,
  getUserScore,
  getUserRank,
} from "../controllers/leaderboard.controller";
import { rateLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.use(rateLimiter);

// GET leaderboard for a specific game (public)
router.get("/:gameId", getLeaderboard);

// POST a new score to the leaderboard (authenticated users only)
router.post("/game", authenticate, postScore);

// GET friend leaderboard for a specific game (authenticated users only)
router.get("/:gameId/friends", authenticate, getFriendLeaderboard);

// GET the score of the authenticated user for a specific game
router.get("/:gameId/score", authenticate, getUserScore);

// GET the rank of the authenticated user for a specific game
router.get("/:gameId/rank", authenticate, getUserRank);

export default router;
