import express from "express";
import {
  getAllGames,
  getGameBySlug,
  getGamesByType,
} from "../controllers/game.controller";

const router = express.Router();

router.get("/games", getAllGames);
router.get("/games/:slug", getGameBySlug);
router.get("/games", getGamesByType);

export default router;
