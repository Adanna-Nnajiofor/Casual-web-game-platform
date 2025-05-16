import express from "express";
import {
  registerUser,
  loginUser,
  socialLogin,
} from "../controllers/auth.controller";
import { rateLimiter } from "../utils/rateLimiter";

const router = express.Router();

router.use(rateLimiter);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/social-login", socialLogin);

export default router;
