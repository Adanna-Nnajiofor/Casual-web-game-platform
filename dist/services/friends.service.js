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
exports.acceptFriendRequest = exports.sendFriendRequest = exports.searchUsersByUsername = exports.addFriend = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Firestore reference
const db = firebase_admin_1.default.firestore();
// Add friend to Firestore (both users' friend lists)
const addFriend = (userId, friendId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db
        .collection("friends")
        .doc(userId)
        .update({
        friends: firebase_admin_1.default.firestore.FieldValue.arrayUnion(friendId),
    });
    yield db
        .collection("friends")
        .doc(friendId)
        .update({
        friends: firebase_admin_1.default.firestore.FieldValue.arrayUnion(userId),
    });
});
exports.addFriend = addFriend;
// Search for users by username
const searchUsersByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRef = db.collection("users");
    const querySnapshot = yield usersRef.where("username", "==", username).get();
    if (querySnapshot.empty) {
        return []; // No users found
    }
    return querySnapshot.docs.map((doc) => doc.data());
});
exports.searchUsersByUsername = searchUsersByUsername;
// Send friend request (add to pending requests)
const sendFriendRequest = (userId, requestedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendRequestRef = db.collection("friend_requests").doc(userId);
    yield friendRequestRef.set({
        requestedUserId,
        status: "pending",
    });
});
exports.sendFriendRequest = sendFriendRequest;
// Accept a friend request (move to friends list and update request status)
const acceptFriendRequest = (userId, requestedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const friendRequestRef = db.collection("friend_requests").doc(userId);
    // Update the status to 'accepted'
    yield friendRequestRef.update({ status: "accepted" });
    // Add both users to each other's friend lists
    yield (0, exports.addFriend)(userId, requestedUserId);
});
exports.acceptFriendRequest = acceptFriendRequest;
