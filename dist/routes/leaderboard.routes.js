"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const leaderboard_controller_1 = require("../controllers/leaderboard.controller");
const router = express_1.default.Router();
//  GET leaderboard for a specific game (public)
router.get("/:gameId", leaderboard_controller_1.getLeaderboard);
//  POST a new score to the leaderboard (authenticated users only)
router.post("/", auth_middleware_1.authenticate, leaderboard_controller_1.postScore);
// GET friend leaderboard for a specific game (authenticated users only)
router.get("/:gameId/friends", auth_middleware_1.authenticate, leaderboard_controller_1.getFriendLeaderboard);
exports.default = router;
