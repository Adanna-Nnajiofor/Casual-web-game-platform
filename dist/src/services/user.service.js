"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserFriends = exports.updateUserStats = exports.addFriend = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const score_service_1 = require("../services/score.service");
// import { AvatarService } from "../services/avatar.service";
// Create a new user
const createUser = async (data, avatarUrl) => {
    const initialScore = 0;
    const user = new user_model_1.default(Object.assign(Object.assign({}, data), { stats: {
            totalScore: initialScore,
            totalGamesPlayed: 0,
            achievements: [],
        }, friends: [], avatar: avatarUrl }));
    try {
        const savedUser = await user.save();
        await (0, score_service_1.validateAndUpdateScore)(savedUser._id.toString(), initialScore, "");
        return savedUser;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed.");
    }
};
exports.createUser = createUser;
// Get all users
const getAllUsers = async () => {
    try {
        return await user_model_1.default.find();
    }
    catch (error) {
        throw new Error("Error fetching users");
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (userId) => {
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user)
            throw new Error("User not found");
        return user;
    }
    catch (error) {
        throw new Error(`Error fetching user with id ${userId}`);
    }
};
exports.getUserById = getUserById;
// Update user details
const updateUser = async (userId, data, avatarUrl) => {
    try {
        const updatedUser = await user_model_1.default.findByIdAndUpdate(userId, { $set: Object.assign(Object.assign({}, data), { avatar: avatarUrl }) }, { new: true });
        if (!updatedUser)
            throw new Error("User not found");
        return updatedUser;
    }
    catch (error) {
        throw new Error("Error updating user");
    }
};
exports.updateUser = updateUser;
// Add a friend (bi-directional)
const addFriend = async (userId, friendId) => {
    try {
        if (userId === friendId) {
            throw new Error("You cannot add yourself as a friend.");
        }
        const user = await user_model_1.default.findById(userId);
        const friend = await user_model_1.default.findById(friendId);
        if (!user || !friend) {
            throw new Error("User or friend not found");
        }
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save();
        }
        if (!friend.friends.includes(user._id)) {
            friend.friends.push(user._id);
            await friend.save();
        }
        return user;
    }
    catch (error) {
        throw new Error("Failed to add friend");
    }
};
exports.addFriend = addFriend;
// Update user stats
const updateUserStats = async (userId, totalScore, totalGamesPlayed, achievements, gameId) => {
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user)
            throw new Error("User not found");
        await (0, score_service_1.validateAndUpdateScore)(userId, totalScore, gameId);
        user.stats.totalGamesPlayed += totalGamesPlayed;
        user.stats.achievements.push(...achievements);
        await user.save();
        return user;
    }
    catch (error) {
        throw new Error("Failed to update stats");
    }
};
exports.updateUserStats = updateUserStats;
// Get all friends of a user
const getUserFriends = async (userId) => {
    try {
        const user = await user_model_1.default.findById(userId).populate("friends");
        if (!user)
            throw new Error("User not found");
        return user.friends;
    }
    catch (error) {
        throw new Error("Error fetching friends");
    }
};
exports.getUserFriends = getUserFriends;
// Delete user by ID
const deleteUser = async (userId) => {
    try {
        const deletedUser = await user_model_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
    }
    catch (error) {
        throw new Error("Error deleting user");
    }
};
exports.deleteUser = deleteUser;
