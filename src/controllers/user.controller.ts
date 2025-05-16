import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import User, { IUser } from "../models/user.model";
import { cloudinary } from "../config/cloudinary";
import { validateAndUpdateScore } from "../services/score.service";
import { AvatarService } from "../services/avatar.service";
import { AppError } from "../utils/AppError";
import { Multer } from 'multer';

// Create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    let avatarUrl = avatar;

    if (req.files && (req.files as { avatar?: Express.Multer.File[] }).avatar) {
      const file = (req.files as { avatar: Express.Multer.File[] }).avatar[0];
      avatarUrl = await AvatarService.uploadAvatar(file);
    }

    const user = new User({
      username,
      email,
      password,
      avatar: avatarUrl,
      stats: { totalScore: 0, totalGamesPlayed: 0, achievements: [] },
      friends: [],
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User created", user: savedUser });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { username, email, avatar } = req.body;

  try {
    let avatarUrl = avatar;

    if (req.files && (req.files as { avatar?: Express.Multer.File[] }).avatar) {
      const file = (req.files as { avatar: Express.Multer.File[] }).avatar[0];
      avatarUrl = await AvatarService.uploadAvatar(file);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email, avatar: avatarUrl } },
      { new: true }
    );

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

// Add a friend (bi-directional)
export const addFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    if (userId === friendId) {
      return next(new AppError("You cannot add yourself as a friend.", 400));
    }

    const user = await User.findById(userId).exec();
    const friend = await User.findById(friendId).exec();

    if (!user || !friend) {
      return next(new AppError("User or friend not found", 404));
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
    next(error);
  }
};

// Update user stats
export const updateUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { totalScore, totalGamesPlayed, achievements, gameId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await validateAndUpdateScore(userId, totalScore, gameId);
    user.stats.totalGamesPlayed += totalGamesPlayed || 0;

    if (achievements && Array.isArray(achievements)) {
      user.stats.achievements.push(...achievements);
    }

    await user.save();
    res.status(200).json({ message: "Stats updated", user });
  } catch (error) {
    next(error);
  }
};

// Get all friends of a user
export const getUserFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate<{ friends: IUser[] }>(
      "friends"
    );
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json(user.friends);
  } catch (error) {
    next(error);
  }
};
