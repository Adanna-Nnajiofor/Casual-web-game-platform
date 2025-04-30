import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getLeaderboard,
  postScore,
  getFriendLeaderboard,
} from "../controllers/leaderboard.controller";

const router = express.Router();

//  GET leaderboard for a specific game (public)
router.get("/:gameId", getLeaderboard);

//  POST a new score to the leaderboard (authenticated users only)
router.post("/", authenticate, postScore);

// GET friend leaderboard for a specific game (authenticated users only)
router.get("/:gameId/friends", authenticate, getFriendLeaderboard);

export default router;
