import express from "express";
import { saveSession } from "../controllers/session.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/sessions", authenticate, saveSession);

export default router;
