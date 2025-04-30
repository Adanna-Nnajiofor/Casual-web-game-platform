import { Request, Response } from "express";
import {
  searchUsersByUsername,
  sendFriendRequest,
  acceptFriendRequest,
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
      return; // Return explicitly after sending the response
    }

    const users = await searchUsersByUsername(username);
    res.status(200).json({ users });
  } catch (error: unknown) {
    // Type assertion to error as an instance of Error
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
      return; // Return explicitly after sending the response
    }

    await sendFriendRequest(userId, requestedUserId);
    res.status(200).json({ message: "Friend request sent" });
  } catch (error: unknown) {
    // Type assertion to error as an instance of Error
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
      return; // Return explicitly after sending the response
    }

    await acceptFriendRequest(userId, requestedUserId);
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error: unknown) {
    // Type assertion to error as an instance of Error
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
