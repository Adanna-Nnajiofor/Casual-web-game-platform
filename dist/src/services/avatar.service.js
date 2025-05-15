"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarService = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const firebase_admin_1 = require("../config/firebase-admin");
// import { IUser } from "../models/user.model";
class AvatarService {
    /**
     * Upload avatar image to Cloudinary and return the image URL.
     *
     * @param base64Image - The base64 encoded image to upload.
     * @returns A promise that resolves to the avatar's secure URL.
     */
    static async uploadAvatar(base64Image) {
        try {
            const result = await cloudinary_1.default.uploader.upload(base64Image, {
                folder: "avatars",
            });
            return result.secure_url;
        }
        catch (error) {
            console.error("Error uploading avatar:", error);
            throw new Error("Failed to upload avatar");
        }
    }
    /**
     * Updates the avatar URL in the database for a specific user.
     *
     * @param userId - The ID of the user whose avatar needs to be updated.
     * @param avatarUrl - The new avatar URL to save in the database.
     */
    static async updateAvatarInDb(userId, avatarUrl) {
        try {
            const userRef = firebase_admin_1.db.collection("users").doc(userId);
            await userRef.update({
                avatar: avatarUrl,
            });
            console.log(`Avatar updated successfully for user with ID: ${userId}`);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Error updating avatar in database: " + error.message);
            }
            throw new Error("Unknown error updating avatar in database.");
        }
    }
    /**
     * Complete flow for uploading an avatar and updating the database.
     *
     * @param userId - The ID of the user whose avatar is being updated.
     * @param base64Image - The base64 encoded image of the avatar.
     * @returns A promise that resolves once the avatar is uploaded and the database is updated.
     */
    static async handleAvatarUpdate(userId, base64Image) {
        try {
            // Upload avatar to Cloudinary
            const avatarUrl = await this.uploadAvatar(base64Image);
            // Update the avatar URL in the database
            await this.updateAvatarInDb(userId, avatarUrl);
            // Return the URL of the updated avatar
            return avatarUrl;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Error handling avatar update: " + error.message);
            }
            throw new Error("Unknown error handling avatar update.");
        }
    }
}
exports.AvatarService = AvatarService;
