import admin from "firebase-admin";

// Firestore reference
const db = admin.firestore();

// Add friend to Firestore (both users' friend lists)
export const addFriend = async (userId: string, friendId: string) => {
  await db
    .collection("friends")
    .doc(userId)
    .update({
      friends: admin.firestore.FieldValue.arrayUnion(friendId),
    });

  await db
    .collection("friends")
    .doc(friendId)
    .update({
      friends: admin.firestore.FieldValue.arrayUnion(userId),
    });
};

// Search for users by username
export const searchUsersByUsername = async (username: string) => {
  const usersRef = db.collection("users");
  const querySnapshot = await usersRef.where("username", "==", username).get();

  if (querySnapshot.empty) {
    return []; // No users found
  }

  return querySnapshot.docs.map((doc) => doc.data());
};

// Send friend request (add to pending requests)
export const sendFriendRequest = async (
  userId: string,
  requestedUserId: string
) => {
  const friendRequestRef = db.collection("friend_requests").doc(userId);
  await friendRequestRef.set({
    requestedUserId,
    status: "pending",
  });
};

// Accept a friend request (move to friends list and update request status)
export const acceptFriendRequest = async (
  userId: string,
  requestedUserId: string
) => {
  const friendRequestRef = db.collection("friend_requests").doc(userId);

  // Update the status to 'accepted'
  await friendRequestRef.update({ status: "accepted" });

  // Add both users to each other's friend lists
  await addFriend(userId, requestedUserId);
};
