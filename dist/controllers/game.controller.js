"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGamesByType = exports.getGameBySlug = exports.getAllGames = void 0;
const game_service_1 = require("../services/game.service");
const getAllGames = async (req, res) => {
    try {
        const games = await (0, game_service_1.fetchAllGames)();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllGames = getAllGames;
const getGameBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const game = await (0, game_service_1.fetchGameBySlug)(slug);
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
const getGamesByType = async (req, res) => {
    const { type } = req.query;
    if (!type || typeof type !== "string") {
        res.status(400).json({ message: "Missing or invalid game type" });
        return;
    }
    try {
        const games = await (0, game_service_1.fetchGamesByType)(type);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch games by type", error });
    }
};
exports.getGamesByType = getGamesByType;
