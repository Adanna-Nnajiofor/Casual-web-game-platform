import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user.model";
import { validateAndUpdateScore } from "../services/score.service";

// Update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { username, email, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email, avatar } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// Get all users
export const getAllUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Update user stats (e.g. after a game)
export const updateUserStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { totalScore, totalGamesPlayed, achievements } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Use the validateAndUpdateScore function to validate and update the score
    await validateAndUpdateScore(userId, totalScore);

    // Update total games played and achievements as well
    user.stats.totalGamesPlayed += totalGamesPlayed || 0;

    if (achievements && Array.isArray(achievements)) {
      user.stats.achievements.push(...achievements);
    }

    await user.save();
    res.status(200).json({ message: "Stats updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update stats", error });
  }
};

// Add a friend (bi-directional)
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    if (userId === friendId) {
      res.status(400).json({ message: "You cannot add yourself as a friend." });
      return;
    }

    const user = await User.findById(userId).exec();
    const friend = await User.findById(friendId).exec();

    if (!user || !friend) {
      res.status(404).json({ message: "User or friend not found" });
      return;
    }

    if (!user.friends.includes(friend._id as Types.ObjectId)) {
      user.friends.push(friend._id as Types.ObjectId);
      await user.save();
    }

    if (!friend.friends.includes(user._id as Types.ObjectId)) {
      friend.friends.push(user._id as Types.ObjectId);
      await friend.save();
    }

    res.status(200).json({ message: "Friend added", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to add friend", error });
  }
};
