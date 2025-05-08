import { v2 as cloudinary } from "cloudinary";
import { db } from "../config/firebase-admin";
// import { IUser } from "../models/user.model";

export class AvatarService {
  /**
   * Upload avatar image to Cloudinary and return the image URL.
   *
   * @param file - The file to upload (should be a single avatar file).
   * @returns A promise that resolves to the avatar's secure URL.
   */
  static async uploadAvatar(file: Express.Multer.File): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "avatars/",
      });
      return result.secure_url;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          "Error uploading avatar to Cloudinary: " + error.message
        );
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
  static async updateAvatarInDb(
    userId: string,
    avatarUrl: string
  ): Promise<void> {
    try {
      const userRef = db.collection("users").doc(userId);
      await userRef.update({
        avatar: avatarUrl, // Update the avatar field with the new URL
      });
      console.log(`Avatar updated successfully for user with ID: ${userId}`);
    } catch (error: unknown) {
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
  static async handleAvatarUpdate(
    userId: string,
    file: Express.Multer.File
  ): Promise<string> {
    try {
      // Upload avatar to Cloudinary
      const avatarUrl = await this.uploadAvatar(file);

      // Update the avatar URL in the database
      await this.updateAvatarInDb(userId, avatarUrl);

      // Return the URL of the updated avatar
      return avatarUrl;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error handling avatar update: " + error.message);
      }
      throw new Error("Unknown error handling avatar update.");
    }
  }
}
