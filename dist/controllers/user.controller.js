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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFriends = exports.updateUserStats = exports.addFriend = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const score_service_1 = require("../services/score.service");
const avatar_service_1 = require("../services/avatar.service");
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, avatar } = req.body;
    try {
        let avatarUrl = avatar;
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            // Use AvatarService to upload avatar
            avatarUrl = yield avatar_service_1.AvatarService.uploadAvatar(file);
        }
        const user = new user_model_1.default({
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
        const savedUser = yield user.save();
        res.status(201).json({ message: "User created", user: savedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error });
    }
});
exports.createUser = createUser;
// Get all users
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});
exports.getUserById = getUserById;
// Update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { username, email, avatar } = req.body;
    try {
        let avatarUrl = avatar; // If avatar URL is passed directly (not uploading an image)
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            // Use AvatarService to upload avatar
            avatarUrl = yield avatar_service_1.AvatarService.uploadAvatar(file);
        }
        const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { $set: { username, email, avatar: avatarUrl } }, { new: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User updated", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
});
exports.updateUser = updateUser;
// Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield user_model_1.default.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});
exports.deleteUser = deleteUser;
// Add a friend (bi-directional)
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { friendId } = req.body;
    try {
        if (userId === friendId) {
            res.status(400).json({ message: "You cannot add yourself as a friend." });
            return;
        }
        const user = yield user_model_1.default.findById(userId).exec();
        const friend = yield user_model_1.default.findById(friendId).exec();
        if (!user || !friend) {
            res.status(404).json({ message: "User or friend not found" });
            return;
        }
        if (!user.friends.includes(friend._id)) {
            user.friends.push(friend._id);
            yield user.save();
        }
        if (!friend.friends.includes(user._id)) {
            friend.friends.push(user._id);
            yield friend.save();
        }
        res.status(200).json({ message: "Friend added", user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add friend", error });
    }
});
exports.addFriend = addFriend;
// Update user stats (e.g. after a game)
const updateUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { totalScore, totalGamesPlayed, achievements } = req.body;
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Use the validateAndUpdateScore function to validate and update the score
        yield (0, score_service_1.validateAndUpdateScore)(userId, totalScore);
        // Update total games played and achievements as well
        user.stats.totalGamesPlayed += totalGamesPlayed || 0;
        if (achievements && Array.isArray(achievements)) {
            user.stats.achievements.push(...achievements);
        }
        yield user.save();
        res.status(200).json({ message: "Stats updated", user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update stats", error });
    }
});
exports.updateUserStats = updateUserStats;
// Get all friends of a user
const getUserFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const user = yield user_model_1.default.findById(userId).populate("friends");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user.friends);
    }
    catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Error fetching friends", error });
    }
});
exports.getUserFriends = getUserFriends;
