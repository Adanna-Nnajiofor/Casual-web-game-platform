"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGamesByType = exports.fetchGameBySlug = exports.fetchAllGames = void 0;
const Game_model_1 = __importDefault(require("../models/Game.model"));
const fetchAllGames = async () => {
    return await Game_model_1.default.find();
};
exports.fetchAllGames = fetchAllGames;
const fetchGameBySlug = async (slug) => {
    return await Game_model_1.default.findOne({ slug });
};
exports.fetchGameBySlug = fetchGameBySlug;
const fetchGamesByType = async (type) => {
    return await Game_model_1.default.find({ type });
};
exports.fetchGamesByType = fetchGamesByType;
