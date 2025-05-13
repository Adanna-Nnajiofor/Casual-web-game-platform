"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineFriends = exports.cancelFriendRequest = exports.acceptFriendRequest = exports.sendFriendRequest = exports.searchUsersByUsername = exports.addFriend = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Firestore reference
const db = firebase_admin_1.default.firestore();
// Add friend to Firestore (both users' friend lists)
const addFriend = async (userId, friendId) => {
    await db
        .collection("friends")
        .doc(userId)
        .update({
        friends: firebase_admin_1.default.firestore.FieldValue.arrayUnion(friendId),
    });
    await db
        .collection("friends")
        .doc(friendId)
        .update({
        friends: firebase_admin_1.default.firestore.FieldValue.arrayUnion(userId),
    });
};
exports.addFriend = addFriend;
// Search for users by username
const searchUsersByUsername = async (username) => {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("username", "==", username).get();
    if (querySnapshot.empty) {
        return []; // No users found
    }
    return querySnapshot.docs.map((doc) => doc.data());
};
exports.searchUsersByUsername = searchUsersByUsername;
// Send friend request (add to pending requests)
const sendFriendRequest = async (userId, requestedUserId) => {
    const friendRequestRef = db.collection("friend_requests").doc(userId);
    await friendRequestRef.set({
        requestedUserId,
        status: "pending",
    });
};
exports.sendFriendRequest = sendFriendRequest;
// Accept a friend request (move to friends list and update request status)
const acceptFriendRequest = async (userId, requestedUserId) => {
    const friendRequestRef = db.collection("friend_requests").doc(userId);
    // Update the status to 'accepted'
    await friendRequestRef.update({ status: "accepted" });
    // Add both users to each other's friend lists
    await (0, exports.addFriend)(userId, requestedUserId);
};
exports.acceptFriendRequest = acceptFriendRequest;
// Cancel a friend request
const cancelFriendRequest = async (userId, requestedUserId) => {
    const friendRequestRef = db.collection("friend_requests").doc(userId);
    const doc = await friendRequestRef.get();
    if (!doc.exists) {
        throw new Error("Friend request not found");
    }
    const data = doc.data();
    if ((data === null || data === void 0 ? void 0 : data.requestedUserId) !== requestedUserId || (data === null || data === void 0 ? void 0 : data.status) !== "pending") {
        throw new Error("Cannot cancel this request");
    }
    await friendRequestRef.delete();
};
exports.cancelFriendRequest = cancelFriendRequest;
// Get online friends
const getOnlineFriends = async (userId) => {
    var _a;
    const userFriendsRef = db.collection("friends").doc(userId);
    const userFriendsDoc = await userFriendsRef.get();
    if (!userFriendsDoc.exists)
        return [];
    const friendIds = ((_a = userFriendsDoc.data()) === null || _a === void 0 ? void 0 : _a.friends) || [];
    if (friendIds.length === 0)
        return [];
    const usersRef = db.collection("users");
    const onlineFriendsSnapshot = await usersRef
        .where("status", "==", "online")
        .where("uid", "in", friendIds)
        .get();
    return onlineFriendsSnapshot.docs.map((doc) => doc.data());
};
exports.getOnlineFriends = getOnlineFriends;
