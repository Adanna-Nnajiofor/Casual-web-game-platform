"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rateLimiter_1 = require("../utils/rateLimiter");
const router = express_1.default.Router();
router.use(rateLimiter_1.rateLimiter);
router.post("/sessions", auth_middleware_1.authenticate, session_controller_1.saveSession);
exports.default = router;
