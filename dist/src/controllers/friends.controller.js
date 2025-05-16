"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seeOnlineFriends = exports.cancelRequest = exports.acceptRequest = exports.sendRequest = exports.searchUsers = void 0;
const friends_service_1 = require("../services/friends.service");
// Search for users by username
const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username || typeof username !== "string") {
            res.status(400).json({ message: "Invalid username" });
            return;
        }
        const users = await (0, friends_service_1.searchUsersByUsername)(username);
        res.status(200).json({ users });
    }
    catch (error) {
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
            return;
        }
        await (0, friends_service_1.sendFriendRequest)(userId, requestedUserId);
        res.status(200).json({ message: "Friend request sent" });
    }
    catch (error) {
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
            return;
        }
        await (0, friends_service_1.acceptFriendRequest)(userId, requestedUserId);
        res.status(200).json({ message: "Friend request accepted" });
    }
    catch (error) {
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
// Cancel a friend request
const cancelRequest = async (req, res) => {
    try {
        const { userId, requestedUserId } = req.body;
        if (!userId || !requestedUserId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        await (0, friends_service_1.cancelFriendRequest)(userId, requestedUserId);
        res.status(200).json({ message: "Friend request cancelled" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error cancelling friend request",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Error cancelling friend request",
                error: "An unknown error occurred",
            });
        }
    }
};
exports.cancelRequest = cancelRequest;
// See online friends
const seeOnlineFriends = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId || typeof userId !== "string") {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const onlineFriends = await (0, friends_service_1.getOnlineFriends)(userId);
        if (onlineFriends.length === 0) {
            res.status(200).json({
                message: "😢 Nobody is online",
                onlineFriends: [],
            });
            return;
        }
        res.status(200).json({ onlineFriends });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Error getting online friends",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Error getting online friends",
                error: "An unknown error occurred",
            });
        }
    }
};
exports.seeOnlineFriends = seeOnlineFriends;
