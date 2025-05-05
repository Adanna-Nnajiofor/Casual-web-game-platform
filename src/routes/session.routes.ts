import express from "express";
import { saveSession } from "../controllers/session.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { rateLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.use(rateLimiter);

router.post("/sessions", authenticate, saveSession);

export default router;
