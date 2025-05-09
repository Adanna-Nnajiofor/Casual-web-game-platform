"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvatar = exports.uploadAvatar = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
// Setup Multer for file handling
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.uploadAvatar = [
    // Upload image to Cloudinary
    upload.single("avatar"),
    async (req, res) => {
        var _a;
        try {
            const result = await cloudinary_1.v2.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path, {
                folder: "avatars/",
            });
            const imageUrl = result.secure_url;
            res.status(200).json({ url: imageUrl });
        }
        catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            res.status(500).send("Error uploading image");
        }
    },
];
const updateAvatar = async (req, res) => {
    const { userId, avatarUrl } = req.body;
    try {
        const userRef = firebase_admin_1.db.collection("users").doc(userId);
        await userRef.update({
            avatar: avatarUrl,
        });
        res.status(200).send("Avatar updated successfully!");
    }
    catch (error) {
        console.error("Error updating avatar:", error);
        res.status(500).send("Error updating avatar");
    }
};
exports.updateAvatar = updateAvatar;
