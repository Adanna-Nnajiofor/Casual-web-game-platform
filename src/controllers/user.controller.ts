import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user.model";
import { cloudinary } from "../config/cloudinary";
import { validateAndUpdateScore } from "../services/score.service";
import { IUser } from "../models/user.model";
import { AvatarService } from "../services/avatar.service";

// Create user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password, avatar } = req.body;

  try {
    let avatarUrl = avatar;

    if (req.files && (req.files as { avatar?: Express.Multer.File[] }).avatar) {
      const file = (req.files as { avatar: Express.Multer.File[] }).avatar[0];

      // Use AvatarService to upload avatar
      avatarUrl = await AvatarService.uploadAvatar(file);
    }

    const user = new User({
      username,
      email,
      password,
      avatar: avatarUrl,
      stats: {
        totalScore: 0,
        totalGamesPlayed: 0,
        achievements: [],
      },
      friends: [],
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User created", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user", error });
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

// Update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { username, email, avatar } = req.body;

  try {
    let avatarUrl = avatar; // If avatar URL is passed directly (not uploading an image)

    if (req.files && (req.files as { avatar?: Express.Multer.File[] }).avatar) {
      const file = (req.files as { avatar: Express.Multer.File[] }).avatar[0];

      // Use AvatarService to upload avatar
      avatarUrl = await AvatarService.uploadAvatar(file);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email, avatar: avatarUrl } },
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

// Get all friends of a user
export const getUserFriends = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate<{ friends: IUser[] }>(
      "friends"
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Error fetching friends", error });
  }
};
