import { Request, Response } from "express";
import Game from "../models/Game.model";

//  Fetch all games
export const getAllGames = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch a single game by slug
export const getGameBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slug } = req.params;

  try {
    const game = await Game.findOne({ slug });
    if (!game) {
      res.status(404).json({ message: "Game not found" });
      return;
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
