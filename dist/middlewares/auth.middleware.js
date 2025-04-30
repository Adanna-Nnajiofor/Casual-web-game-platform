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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const firebase_admin_1 = require("../config/firebase-admin");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
        return; // Return here to prevent continuing to the next middleware
    }
    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    // First, try verifying as JWT token
    try {
        const secret = process.env.JWT_SECRET || "testsecret";
        const decodedJwt = jsonwebtoken_1.default.verify(token, secret);
        // Check if the JWT token is expired
        if (decodedJwt.exp && decodedJwt.exp < Math.floor(Date.now() / 1000)) {
            res.status(401).json({ message: "JWT token has expired" });
            return; // Return here to prevent continuing to the next middleware
        }
        req.user = decodedJwt; // If valid JWT, assign decoded user data
        return next(); // Continue to next middleware or route handler
    }
    catch (jwtError) {
        // If JWT verification fails, proceed to try Firebase token
        if (jwtError.name === "TokenExpiredError") {
            res.status(401).json({ message: "JWT token has expired" });
            return; // Return here to prevent continuing to the next middleware
        }
    }
    // If JWT verification fails, try verifying as Firebase token
    try {
        const decodedFirebaseToken = yield firebase_admin_1.admin
            .auth()
            .verifyIdToken(token);
        // Check if the Firebase token is expired (Firebase tokens are valid for 1 hour)
        const issuedAt = decodedFirebaseToken.auth_time;
        const expirationTime = 3600; // Firebase tokens expire after 1 hour
        if (Math.floor(Date.now() / 1000) - issuedAt > expirationTime) {
            res.status(401).json({ message: "Firebase token has expired" });
            return; // Return here to prevent continuing to the next middleware
        }
        req.user = decodedFirebaseToken; // If valid Firebase token, assign decoded token data
        return next(); // Continue to next middleware or route handler
    }
    catch (firebaseError) {
        // If both JWT and Firebase verification fail, return 401 Unauthorized
        res.status(401).json({
            message: "Invalid token",
            error: firebaseError.message || "Unknown error",
        });
        return; // Return here to prevent continuing to the next middleware
    }
});
exports.authenticate = authenticate;
