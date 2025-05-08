import { Request, Response } from "express";
import {
  fetchAllGames,
  fetchGameBySlug,
  fetchGamesByType,
} from "../services/game.service";

export const getAllGames = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await fetchAllGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getGameBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const game = await fetchGameBySlug(slug);
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getGamesByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type } = req.query;

  if (!type || typeof type !== "string") {
    res.status(400).json({ message: "Missing or invalid game type" });
    return;
  }

  try {
    const games = await fetchGamesByType(type);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch games by type", error });
  }
};
