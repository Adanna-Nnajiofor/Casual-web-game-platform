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
exports.verifyToken = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = yield firebase_admin_1.auth.verifyIdToken(token);
        return decodedToken;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
});
exports.verifyToken = verifyToken;
