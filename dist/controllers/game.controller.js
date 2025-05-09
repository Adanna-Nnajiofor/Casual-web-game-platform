"use strict";
<<<<<<< HEAD
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
=======
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
>>>>>>> game-one
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllGames = getAllGames;
<<<<<<< HEAD
const getGameBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const game = yield (0, game_service_1.fetchGameBySlug)(slug);
=======
// Fetch a single game by slug
const getGameBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const game = await Game_model_1.default.findOne({ slug });
>>>>>>> game-one
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
