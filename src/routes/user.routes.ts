import express from "express";
import {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserStats,
  addFriend,
  getUserFriends,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

// Protected/User-specific routes
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.patch("/:userId", authenticate, updateUser);
router.delete("/:userId", authenticate, deleteUser);
router.patch("/:userId/stats", authenticate, updateUserStats);
router.post("/:userId/add-friend", authenticate, addFriend);
router.get("/:userId/friends", authenticate, getUserFriends);

export default router;
