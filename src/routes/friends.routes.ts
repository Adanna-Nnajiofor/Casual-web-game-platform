import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  searchUsers,
  sendRequest,
  acceptRequest,
} from "../controllers/friends.controller";
import { rateLimiter } from "../utils/rateLimiter";

const router = Router();

router.use(rateLimiter);

// Search for users by username (authentication may or may not be required for this)
router.get("/search", authenticate, searchUsers);

// Send a friend request (authentication required)
router.post("/send-request", authenticate, sendRequest);

// Accept a friend request (authentication required)
router.post("/accept-request", authenticate, acceptRequest);

export default router;
