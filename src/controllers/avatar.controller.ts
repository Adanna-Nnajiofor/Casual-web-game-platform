import { Request, Response } from "express";
import { db } from "../config/firebase-admin";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Setup Multer for file handling
const upload = multer({ dest: "uploads/" });

export const uploadAvatar = [
  // Upload image to Cloudinary
  upload.single("avatar"),
  async (req: Request, res: Response) => {
    try {
      const result = await cloudinary.uploader.upload(req.file?.path!, {
        folder: "avatars/",
      });

      const imageUrl = result.secure_url;

      res.status(200).json({ url: imageUrl });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).send("Error uploading image");
    }
  },
];

export const updateAvatar = async (req: Request, res: Response) => {
  const { userId, avatarUrl } = req.body;

  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      avatar: avatarUrl,
    });

    res.status(200).send("Avatar updated successfully!");
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).send("Error updating avatar");
  }
};
