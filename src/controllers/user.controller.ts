import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { AppError } from "../utils/AppError";
import { AvatarService } from "../services/avatar.service";
import * as UserService from "../services/user.service";

// Create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password, avatar } = req.body;

  try {
    const existingUser = await UserService.getUserById(email);
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    let avatarUrl = avatar;

    if (req.files && "avatar" in req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const file = files.avatar?.[0];
      if (file) {
        avatarUrl = await AvatarService.uploadAvatar(file);
      }
    }

    const newUser = await UserService.createUser(
      { username, email, password },
      avatarUrl
    );
    res.status(201).json({ message: "User created", user: newUser });
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
    const users = await UserService.getAllUsers();
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

  if (!Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    const user = await UserService.getUserById(userId);
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

  if (!Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    let avatarUrl = avatar;

    if (req.files && "avatar" in req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const file = files.avatar?.[0];
      if (file) {
        avatarUrl = await AvatarService.uploadAvatar(file);
      }
    }

    const updatedUser = await UserService.updateUser(
      userId,
      { username, email },
      avatarUrl
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

  if (!Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    await UserService.deleteUser(userId);
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

  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
    return next(new AppError("Invalid user or friend ID", 400));
  }

  try {
    const user = await UserService.addFriend(userId, friendId);
    res.status(200).json({ message: "Friend added", user });
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

  if (!Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    const friends = await UserService.getUserFriends(userId);
    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
};

export const updateUserStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;
  const { totalScore, totalGamesPlayed, achievements, gameId } = req.body;

  if (!Types.ObjectId.isValid(userId)) {
    return next(new AppError("Invalid user ID", 400));
  }

  try {
    const updatedUser = await UserService.updateUserStats(
      userId,
      totalScore,
      totalGamesPlayed,
      achievements,
      gameId
    );

    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ message: "User stats updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};
