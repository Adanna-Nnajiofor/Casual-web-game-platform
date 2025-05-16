"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarService = void 0;
const cloudinary_1 = require("cloudinary");
const firebase_admin_1 = require("../config/firebase-admin");
// import { IUser } from "../models/user.model";
class AvatarService {
    /**
     * Upload avatar image to Cloudinary and return the image URL.
     *
     * @param file - The file to upload (should be a single avatar file).
     * @returns A promise that resolves to the avatar's secure URL.
     */
    static async uploadAvatar(file) {
        try {
            const result = await cloudinary_1.v2.uploader.upload(file.path, {
                folder: "avatars/",
            });
            return result.secure_url;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error("Error uploading avatar to Cloudinary: " + error.message);
            }
            throw new Error("Unknown error uploading avatar to Cloudinary.");
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
                avatar: avatarUrl, // Update the avatar field with the new URL
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
     * @param file - The avatar file uploaded by the user.
     * @returns A promise that resolves once the avatar is uploaded and the database is updated.
     */
    static async handleAvatarUpdate(userId, file) {
        try {
            // Upload avatar to Cloudinary
            const avatarUrl = await this.uploadAvatar(file);
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
