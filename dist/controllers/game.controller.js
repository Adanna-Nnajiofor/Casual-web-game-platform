"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGamesByType = exports.getGameBySlug = exports.getAllGames = void 0;
const game_service_1 = require("../services/game.service");
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield (0, game_service_1.fetchAllGames)();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getAllGames = getAllGames;
const getGameBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const game = yield (0, game_service_1.fetchGameBySlug)(slug);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getGameBySlug = getGameBySlug;
const getGamesByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.query;
    if (!type || typeof type !== "string") {
        res.status(400).json({ message: "Missing or invalid game type" });
        return;
    }
    try {
        const games = yield (0, game_service_1.fetchGamesByType)(type);
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch games by type", error });
    }
});
exports.getGamesByType = getGamesByType;
