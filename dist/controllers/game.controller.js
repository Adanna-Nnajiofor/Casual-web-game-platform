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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameBySlug = exports.getAllGames = void 0;
const Game_model_1 = __importDefault(require("../models/Game.model"));
//  Fetch all games
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield Game_model_1.default.find();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getAllGames = getAllGames;
// Fetch a single game by slug
const getGameBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const game = yield Game_model_1.default.findOne({ slug });
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
