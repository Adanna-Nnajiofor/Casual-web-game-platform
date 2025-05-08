import Game from "../models/Game.model";

export const fetchAllGames = async () => {
  return await Game.find();
};

export const fetchGameBySlug = async (slug: string) => {
  return await Game.findOne({ slug });
};

export const fetchGamesByType = async (type: string) => {
  return await Game.find({ type });
};
