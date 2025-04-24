"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        // Verify the token and decode it
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Attach the user info to the request object
        req.user = decoded;
        next(); // Proceed to route
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.authenticate = authenticate;
