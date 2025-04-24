import express from "express";
import { getAllGames, getGameBySlug } from "../controllers/game.controller";

const router = express.Router();

router.get("/games", getAllGames);
router.get("/games/:slug", getGameBySlug);

export default router;
