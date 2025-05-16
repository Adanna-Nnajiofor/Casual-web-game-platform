import express, { Request, Response } from "express";
import {
  getAllGames,
  getGameBySlug,
  getGamesByType,
} from "../controllers/game.controller";

const router = express.Router();

// Debug middleware for this router
router.use((req: Request, res: Response, next) => {
  console.log("Game Router:", req.method, req.path);
  next();
});

// GET /api/games - Get all games
router.get("/", (req: Request, res: Response, next) => {
  console.log("Handling GET all games request");
  getAllGames(req, res).catch(next);
});

// GET /api/games/type/:type - Get games by type (trivia or streetz)
router.get("/type/:type", (req: Request, res: Response, next) => {
  console.log("Handling GET games by type:", req.params.type);
  getGamesByType(req, res).catch(next);
});

// GET /api/games/:slug - Get specific game by slug
router.get("/:slug", (req: Request, res: Response, next) => {
  console.log("Handling GET game by slug:", req.params.slug);
  getGameBySlug(req, res).catch(next);
});

export default router;
