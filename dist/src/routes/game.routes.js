"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_controller_1 = require("../controllers/game.controller");
const router = express_1.default.Router();
// Debug middleware for this router
router.use((req, res, next) => {
    console.log("Game Router:", req.method, req.path);
    next();
});
// GET /api/games - Get all games
router.get("/", (req, res, next) => {
    console.log("Handling GET all games request");
    (0, game_controller_1.getAllGames)(req, res).catch(next);
});
// GET /api/games/type/:type - Get games by type (trivia or streetz)
router.get("/type/:type", (req, res, next) => {
    console.log("Handling GET games by type:", req.params.type);
    (0, game_controller_1.getGamesByType)(req, res).catch(next);
});
// GET /api/games/:slug - Get specific game by slug
router.get("/:slug", (req, res, next) => {
    console.log("Handling GET game by slug:", req.params.slug);
    (0, game_controller_1.getGameBySlug)(req, res).catch(next);
});
exports.default = router;
