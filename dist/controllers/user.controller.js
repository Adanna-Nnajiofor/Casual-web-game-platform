"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFriends = exports.updateUserStats = exports.addFriend = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const score_service_1 = require("../services/score.service");
const avatar_service_1 = require("../services/avatar.service");
const AppError_1 = require("../utils/AppError");
// Create user
const createUser = async (req, res, next) => {
    const { username, email, password, avatar } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            return next(new AppError_1.AppError("User already exists", 400));
        }
        let avatarUrl = avatar;
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            avatarUrl = await avatar_service_1.AvatarService.uploadAvatar(file);
        }
        const user = new user_model_1.default({
            username,
            email,
            password,
            avatar: avatarUrl,
            stats: { totalScore: 0, totalGamesPlayed: 0, achievements: [] },
            friends: [],
        });
        const savedUser = await user.save();
        res.status(201).json({ message: "User created", user: savedUser });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
// Get all users
const getAllUsers = async (_, res, next) => {
    try {
        const users = await user_model_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
// Update user
const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { username, email, avatar } = req.body;
    try {
        let avatarUrl = avatar;
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            avatarUrl = await avatar_service_1.AvatarService.uploadAvatar(file);
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(userId, { $set: { username, email, avatar: avatarUrl } }, { new: true });
        if (!updatedUser) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json({ message: "User updated", user: updatedUser });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await user_model_1.default.findByIdAndDelete(userId);
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
// Add a friend (bi-directional)
const addFriend = async (req, res, next) => {
    const { userId } = req.params;
    const { friendId } = req.body;
    try {
        if (userId === friendId) {
            return next(new AppError_1.AppError("You cannot add yourself as a friend.", 400));
        }
        const user = await user_model_1.default.findById(userId).exec();
        const friend = await user_model_1.default.findById(friendId).exec();
        if (!user || !friend) {
            return next(new AppError_1.AppError("User or friend not found", 404));
        }
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            await user.save();
        }
        if (!friend.friends.includes(user._id)) {
            friend.friends.push(user._id);
            await friend.save();
        }
        res.status(200).json({ message: "Friend added", user });
    }
    catch (error) {
        next(error);
    }
};
exports.addFriend = addFriend;
// Update user stats
const updateUserStats = async (req, res, next) => {
    const { userId } = req.params;
    const { totalScore, totalGamesPlayed, achievements, gameId } = req.body;
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        await (0, score_service_1.validateAndUpdateScore)(userId, totalScore, gameId);
        user.stats.totalGamesPlayed += totalGamesPlayed || 0;
        if (achievements && Array.isArray(achievements)) {
            user.stats.achievements.push(...achievements);
        }
        await user.save();
        res.status(200).json({ message: "Stats updated", user });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserStats = updateUserStats;
// Get all friends of a user
const getUserFriends = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await user_model_1.default.findById(userId).populate("friends");
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json(user.friends);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserFriends = getUserFriends;
