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
exports.loginUser = exports.registerUser = void 0;
const validate_1 = require("../utils/validate");
const auth_service_1 = require("../services/auth.service");
// Register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = validate_1.registerSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.format(),
        });
        return;
    }
    const { username, email, password } = parsed.data;
    try {
        const { token, user } = yield (0, auth_service_1.registerUserService)(username, email, password);
        res.status(201).json({ message: "User registered", token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message || "Registration failed" });
    }
});
exports.registerUser = registerUser;
// Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = validate_1.loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: parsed.error.format(),
        });
        return;
    }
    const { email, password } = parsed.data;
    try {
        const { token, user } = yield (0, auth_service_1.loginUserService)(email, password);
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message || "Login failed" });
    }
});
exports.loginUser = loginUser;
