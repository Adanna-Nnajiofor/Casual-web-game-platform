"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_controller_1 = require("../controllers/game.controller");
const router = express_1.default.Router();
router.get("/games", game_controller_1.getAllGames);
router.get("/games/:slug", game_controller_1.getGameBySlug);
exports.default = router;
