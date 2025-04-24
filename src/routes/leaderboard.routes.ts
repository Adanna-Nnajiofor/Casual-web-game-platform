import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getLeaderboard,
  postScore,
} from "../controllers/leaderboard.controller";

const router = express.Router();

//  GET leaderboard for a specific game (public)
router.get("/:gameId", getLeaderboard);

//  POST a new score to the leaderboard (authenticated users only)
router.post("/", authenticate, postScore);

export default router;
