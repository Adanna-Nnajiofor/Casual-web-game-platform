"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const verifyToken = async (token) => {
    try {
        const decodedToken = await firebase_admin_1.auth.verifyIdToken(token);
        return decodedToken;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
exports.verifyToken = verifyToken;
