"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFirebaseToken = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const verifyFirebaseToken = async (idToken) => {
    try {
        const decodedToken = await firebase_admin_1.auth.verifyIdToken(idToken);
        return decodedToken;
    }
    catch (error) {
        throw new Error(`Firebase token verification failed: ${error.message}`);
    }
};
exports.verifyFirebaseToken = verifyFirebaseToken;
