"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLoginService = exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyFirebaseToken_1 = require("../utils/verifyFirebaseToken");
require("../config/env");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
// REGISTER SERVICE
const registerUserService = async (username, email, password) => {
    // Check if either email or username already exists
    const existingUser = await user_model_1.default.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error("User with this email or username already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = new user_model_1.default({
        username,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token, user: newUser };
};
exports.registerUserService = registerUserService;
// LOGIN SERVICE
const loginUserService = async (username, password) => {
    const trimmedUsername = username.trim();
    const user = await user_model_1.default.findOne({ username: trimmedUsername });
    if (!user) {
        throw new Error(`User with username "${username}" not found.`);
    }
    if (!user.password) {
        throw new Error("This user has no password set. Try logging in with social login.");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return {
        token,
        user,
        welcomeMessage: `Welcome ${user.username}`,
    };
};
exports.loginUserService = loginUserService;
// SOCIAL LOGIN SERVICE (Google/Facebook)
const socialLoginService = async (idToken) => {
    if (!idToken) {
        throw new Error("ID token is required");
    }
    try {
        // Verify the Firebase ID token
        const decoded = await (0, verifyFirebaseToken_1.verifyFirebaseToken)(idToken);
        const { uid, email, name, picture, firebase } = decoded;
        // Check if email is undefined
        if (!email) {
            throw new Error("Email is required from Firebase");
        }
        // Check if user exists by email (Google or Facebook login can be identified by the provider)
        let user = await user_model_1.default.findOne({ email });
        if (!user) {
            // If user doesn't exist, create a new user
            user = new user_model_1.default({
                username: name || email.split("@")[0],
                email,
                provider: ["google.com", "facebook.com"].includes(firebase === null || firebase === void 0 ? void 0 : firebase.sign_in_provider)
                    ? firebase.sign_in_provider.replace(".com", "")
                    : "google",
                avatar: picture,
                firebaseUid: uid,
                lastLogin: new Date(),
                stats: {
                    totalGamesPlayed: 0,
                    totalScore: 0,
                    achievements: [],
                },
                friends: [],
            });
            await user.save();
        }
        // Generate JWT for your app
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { token, user };
    }
    catch (error) {
        throw new Error("Social login failed");
    }
};
exports.socialLoginService = socialLoginService;
