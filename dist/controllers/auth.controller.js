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
const validate_2 = require("../utils/validate");
const auth_service_1 = require("../services/auth.service");
// REGISTER CONTROLLER
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the registration data using the registerSchema
    const validation = (0, validate_1.validate)(validate_2.registerSchema, req.body);
    if (!validation.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: validation.errors,
        });
        return;
    }
    const { username, email, password } = validation.data;
    try {
        const { token, user } = yield (0, auth_service_1.registerUserService)(username, email, password);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Registration failed",
        });
    }
});
exports.registerUser = registerUser;
// LOGIN CONTROLLER
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = (0, validate_1.validate)(validate_2.loginSchema, req.body);
    if (!validation.success) {
        res.status(400).json({
            message: "Validation failed",
            errors: validation.errors,
        });
        return;
    }
    const { username, password } = validation.data;
    try {
        const { token, user, welcomeMessage } = yield (0, auth_service_1.loginUserService)(username, password);
        res.status(200).json({
            message: welcomeMessage,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        res.status(401).json({
            message: error.message || "Login failed",
        });
    }
});
exports.loginUser = loginUser;
