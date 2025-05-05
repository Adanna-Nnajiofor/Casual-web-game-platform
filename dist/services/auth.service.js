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
exports.loginUserService = exports.registerUserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
require("../config/env");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
// REGISTER SERVICE
const registerUserService = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if either email or username already exists
    const existingUser = yield user_model_1.default.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new Error("User with this email or username already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new user_model_1.default({
        username,
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token, user: newUser };
});
exports.registerUserService = registerUserService;
// LOGIN SERVICE
const loginUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const trimmedUsername = username.trim();
    const user = yield user_model_1.default.findOne({ username: trimmedUsername });
    if (!user) {
        throw new Error(`User with username "${username}" not found.`);
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
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
});
exports.loginUserService = loginUserService;
