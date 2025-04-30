"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptRequest = exports.sendRequest = exports.searchUsers = void 0;
const friends_service_1 = require("../services/friends.service");
// Search for users by username
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        if (!username || typeof username !== "string") {
            res.status(400).json({ message: "Invalid username" });
            return; // Return explicitly after sending the response
        }
        const users = yield (0, friends_service_1.searchUsersByUsername)(username);
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
});
exports.searchUsers = searchUsers;
// Send a friend request
const sendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, requestedUserId } = req.body;
        if (!userId || !requestedUserId) {
            res.status(400).json({ message: "Missing required fields" });
            return; // Return explicitly after sending the response
        }
        yield (0, friends_service_1.sendFriendRequest)(userId, requestedUserId);
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
});
exports.sendRequest = sendRequest;
// Accept a friend request
const acceptRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, requestedUserId } = req.body;
        if (!userId || !requestedUserId) {
            res.status(400).json({ message: "Missing required fields" });
            return; // Return explicitly after sending the response
        }
        yield (0, friends_service_1.acceptFriendRequest)(userId, requestedUserId);
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
});
exports.acceptRequest = acceptRequest;
