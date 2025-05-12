"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptRequest = exports.sendRequest = exports.searchUsers = void 0;
const friends_service_1 = require("../services/friends.service");
// Search for users by username
const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username || typeof username !== "string") {
            res.status(400).json({ message: "Invalid username" });
            return; // Return explicitly after sending the response
        }
        const users = await (0, friends_service_1.searchUsersByUsername)(username);
        res.status(200).json({ users });
    }
    catch (error) {
        // Type assertion to error as an instance of Error
        if (error instanceof Error) {
            res
                .status(500)
                .json({ message: "Error searching users", error: error.message });
        }
        else {
            res.status(500).json({
                message: "Error searching users",
                error: "An unknown error occurred",
            });
        }
    }
};
exports.searchUsers = searchUsers;
// Send a friend request
const sendRequest = async (req, res) => {
    try {
        const { userId, requestedUserId } = req.body;
        if (!userId || !requestedUserId) {
            res.status(400).json({ message: "Missing required fields" });
            return; // Return explicitly after sending the response
        }
        await (0, friends_service_1.sendFriendRequest)(userId, requestedUserId);
        res.status(200).json({ message: "Friend request sent" });
    }
    catch (error) {
        // Type assertion to error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error sending friend request",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Error sending friend request",
                error: "An unknown error occurred",
            });
        }
    }
};
exports.sendRequest = sendRequest;
// Accept a friend request
const acceptRequest = async (req, res) => {
    try {
        const { userId, requestedUserId } = req.body;
        if (!userId || !requestedUserId) {
            res.status(400).json({ message: "Missing required fields" });
            return; // Return explicitly after sending the response
        }
        await (0, friends_service_1.acceptFriendRequest)(userId, requestedUserId);
        res.status(200).json({ message: "Friend request accepted" });
    }
    catch (error) {
        // Type assertion to error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error accepting friend request",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Error accepting friend request",
                error: "An unknown error occurred",
            });
        }
    }
};
exports.acceptRequest = acceptRequest;
