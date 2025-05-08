import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getLeaderboard,
  postScore,
  getFriendLeaderboard,
} from "../controllers/leaderboard.controller";
import { rateLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.use(rateLimiter);

//  GET leaderboard for a specific game (public)
router.get("/:gameId", getLeaderboard);

//  POST a new score to the leaderboard (authenticated users only)
router.post("/", authenticate, postScore);

// GET friend leaderboard for a specific game (authenticated users only)
router.get("/:gameId/friends", authenticate, getFriendLeaderboard);

export default router;
