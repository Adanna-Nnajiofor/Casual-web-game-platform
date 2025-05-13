import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  searchUsers,
  sendRequest,
  acceptRequest,
  cancelRequest,
  seeOnlineFriends,
} from "../controllers/friends.controller";
// import { rateLimiter } from "../utils/rateLimiter";

const router = Router();

// router.use(rateLimiter);

// Search for users by username (authentication required)
router.get("/search", authenticate, searchUsers);

// Send a friend request
router.post("/send-request", authenticate, sendRequest);

// Accept a friend request
router.post("/accept-request", authenticate, acceptRequest);

// Cancel a friend request
router.post("/cancel-request", authenticate, cancelRequest);

// View online friends
router.get("/online-friends", authenticate, seeOnlineFriends);

export default router;
