import Game from "../models/Game.model";

export const fetchAllGames = async () => {
  console.log("Fetching all games...");
  const games = await Game.find();
  console.log("Found games:", games);
  return games;
};

export const fetchGameBySlug = async (slug: string) => {
  console.log("Fetching game by slug:", slug);
  const game = await Game.findOne({ slug });
  console.log("Found game:", game);
  return game;
};

export const fetchGamesByType = async (type: string) => {
  console.log("Fetching games by type:", type);
  const games = await Game.find({ type });
  console.log("Found games:", games);
  return games;
};
