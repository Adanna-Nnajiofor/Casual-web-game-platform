"use strict";
<<<<<<< HEAD
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
>>>>>>> game-one
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStats = exports.getUserFriends = exports.addFriend = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../utils/AppError");
const avatar_service_1 = require("../services/avatar.service");
const UserService = __importStar(require("../services/user.service"));
// Create user
const createUser = async (req, res, next) => {
    const { username, email, password, avatar } = req.body;
    try {
<<<<<<< HEAD
        const existingUser = yield UserService.getUserById(email);
=======
        const existingUser = await user_model_1.default.findOne({ email });
>>>>>>> game-one
        if (existingUser) {
            return next(new AppError_1.AppError("User already exists", 400));
        }
        let avatarUrl = avatar;
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            avatarUrl = await avatar_service_1.AvatarService.uploadAvatar(file);
        }
<<<<<<< HEAD
        const newUser = yield UserService.createUser({ username, email, password }, avatarUrl);
        res.status(201).json({ message: "User created", user: newUser });
=======
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
>>>>>>> game-one
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
// Get all users
const getAllUsers = async (_, res, next) => {
    try {
<<<<<<< HEAD
        const users = yield UserService.getAllUsers();
=======
        const users = await user_model_1.default.find();
>>>>>>> game-one
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
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return next(new AppError_1.AppError("Invalid user ID", 400));
    }
    try {
<<<<<<< HEAD
        const user = yield UserService.getUserById(userId);
=======
        const user = await user_model_1.default.findById(userId);
>>>>>>> game-one
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
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return next(new AppError_1.AppError("Invalid user ID", 400));
    }
    try {
        let avatarUrl = avatar;
        if (req.files && req.files.avatar) {
            const file = req.files.avatar[0];
            avatarUrl = await avatar_service_1.AvatarService.uploadAvatar(file);
        }
<<<<<<< HEAD
        const updatedUser = yield UserService.updateUser(userId, { username, email }, avatarUrl);
=======
        const updatedUser = await user_model_1.default.findByIdAndUpdate(userId, { $set: { username, email, avatar: avatarUrl } }, { new: true });
>>>>>>> game-one
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
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return next(new AppError_1.AppError("Invalid user ID", 400));
    }
    try {
<<<<<<< HEAD
        yield UserService.deleteUser(userId);
=======
        const user = await user_model_1.default.findByIdAndDelete(userId);
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
>>>>>>> game-one
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
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(friendId)) {
        return next(new AppError_1.AppError("Invalid user or friend ID", 400));
    }
    try {
<<<<<<< HEAD
        const user = yield UserService.addFriend(userId, friendId);
=======
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
>>>>>>> game-one
        res.status(200).json({ message: "Friend added", user });
    }
    catch (error) {
        next(error);
    }
};
exports.addFriend = addFriend;
<<<<<<< HEAD
=======
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
>>>>>>> game-one
// Get all friends of a user
const getUserFriends = async (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return next(new AppError_1.AppError("Invalid user ID", 400));
    }
    try {
<<<<<<< HEAD
        const friends = yield UserService.getUserFriends(userId);
        res.status(200).json(friends);
=======
        const user = await user_model_1.default.findById(userId).populate("friends");
        if (!user) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json(user.friends);
>>>>>>> game-one
    }
    catch (error) {
        next(error);
    }
};
exports.getUserFriends = getUserFriends;
const updateUserStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { totalScore, totalGamesPlayed, achievements, gameId } = req.body;
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return next(new AppError_1.AppError("Invalid user ID", 400));
    }
    try {
        const updatedUser = yield UserService.updateUserStats(userId, totalScore, totalGamesPlayed, achievements, gameId);
        if (!updatedUser) {
            return next(new AppError_1.AppError("User not found", 404));
        }
        res.status(200).json({ message: "User stats updated", user: updatedUser });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserStats = updateUserStats;
