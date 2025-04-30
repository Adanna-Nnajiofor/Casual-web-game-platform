import * as admin from "firebase-admin";

// Parse service account key from environment variable
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casual-web-game-default-rtdb.firebaseio.com/", // Realtime Database URL (if needed)
  });
}

// Access Firestore (for Firestore)
const db = admin.firestore();

// Access Authentication (for token verification)
const auth = admin.auth();

export { admin, db, auth };
