import { Request, Response } from "express";
import {
  searchUsersByUsername,
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  getOnlineFriends,
} from "../services/friends.service";

// Search for users by username
export const searchUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.query;
    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Invalid username" });
      return;
    }

    const users = await searchUsersByUsername(username);
    res.status(200).json({ users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Error searching users", error: error.message });
    } else {
      res.status(500).json({
        message: "Error searching users",
        error: "An unknown error occurred",
      });
    }
  }
};

// Send a friend request
export const sendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, requestedUserId } = req.body;
    if (!userId || !requestedUserId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    await sendFriendRequest(userId, requestedUserId);
    res.status(200).json({ message: "Friend request sent" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error sending friend request",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error sending friend request",
        error: "An unknown error occurred",
      });
    }
  }
};

// Accept a friend request
export const acceptRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, requestedUserId } = req.body;
    if (!userId || !requestedUserId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    await acceptFriendRequest(userId, requestedUserId);
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error accepting friend request",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error accepting friend request",
        error: "An unknown error occurred",
      });
    }
  }
};

// Cancel a friend request
export const cancelRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, requestedUserId } = req.body;
    if (!userId || !requestedUserId) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    await cancelFriendRequest(userId, requestedUserId);
    res.status(200).json({ message: "Friend request cancelled" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error cancelling friend request",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error cancelling friend request",
        error: "An unknown error occurred",
      });
    }
  }
};

// See online friends
export const seeOnlineFriends = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const onlineFriends = await getOnlineFriends(userId);

    if (onlineFriends.length === 0) {
      res.status(200).json({
        message: "😢 Nobody is online",
        onlineFriends: [],
      });
      return;
    }

    res.status(200).json({ onlineFriends });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Error getting online friends",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error getting online friends",
        error: "An unknown error occurred",
      });
    }
  }
};
