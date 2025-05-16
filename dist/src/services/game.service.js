"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGamesByType = exports.fetchGameBySlug = exports.fetchAllGames = void 0;
const Game_model_1 = __importDefault(require("../models/Game.model"));
const fetchAllGames = async () => {
    console.log("Fetching all games...");
    const games = await Game_model_1.default.find();
    console.log("Found games:", games);
    return games;
};
exports.fetchAllGames = fetchAllGames;
const fetchGameBySlug = async (slug) => {
    console.log("Fetching game by slug:", slug);
    const game = await Game_model_1.default.findOne({ slug });
    console.log("Found game:", game);
    return game;
};
exports.fetchGameBySlug = fetchGameBySlug;
const fetchGamesByType = async (type) => {
    console.log("Fetching games by type:", type);
    const games = await Game_model_1.default.find({ type });
    console.log("Found games:", games);
    return games;
};
exports.fetchGamesByType = fetchGamesByType;
