"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameBySlug = exports.getAllGames = void 0;
const Game_model_1 = __importDefault(require("../models/Game.model"));
//  Fetch all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game_model_1.default.find();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllGames = getAllGames;
// Fetch a single game by slug
const getGameBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const game = await Game_model_1.default.findOne({ slug });
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getGameBySlug = getGameBySlug;
