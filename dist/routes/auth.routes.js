"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const rateLimiter_1 = require("../utils/rateLimiter");
const router = express_1.default.Router();
router.use(rateLimiter_1.rateLimiter);
router.post("/register", auth_controller_1.registerUser);
router.post("/login", auth_controller_1.loginUser);
router.post("/social-login", auth_controller_1.socialLogin);
exports.default = router;
