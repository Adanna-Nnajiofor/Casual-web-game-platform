import { Request, Response } from "express";
import {
  fetchAllGames,
  fetchGameBySlug,
  fetchGamesByType,
} from "../services/game.service";
import { db } from "../config/firebase-admin";

export const getAllGames = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const games = await fetchAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching all games:", error);
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

    // If it's a trivia game, fetch questions from Firebase
    if (game.type === "trivia") {
      const questionsSnapshot = await db.collection("questions").get();
      const questions = questionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Return game info with questions
      res.status(200).json({
        ...game.toObject(),
        questions,
      });
      return;
    }

    // If it's a streetz game, fetch slangs from Firebase
    if (game.type === "streetz") {
      const slangsSnapshot = await db.collection("slangs").get();
      const slangs = slangsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Return game info with slangs
      res.status(200).json({
        ...game.toObject(),
        slangs,
      });
      return;
    }

    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game by slug:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getGamesByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type } = req.params;

  if (!type) {
    res.status(400).json({ message: "Missing game type" });
    return;
  }

  try {
    const games = await fetchGamesByType(type);
    if (!games || games.length === 0) {
      res.status(404).json({ message: `No games found of type: ${type}` });
      return;
    }

    // For trivia type, include questions
    if (type === "trivia") {
      const questionsSnapshot = await db.collection("questions").get();
      const questions = questionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({
        games,
        questions,
      });
      return;
    }

    // For streetz type, include slangs
    if (type === "streetz") {
      const slangsSnapshot = await db.collection("slangs").get();
      const slangs = slangsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({
        games,
        slangs,
      });
      return;
    }

    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games by type:", error);
    res.status(500).json({ message: "Failed to fetch games by type", error });
  }
};
