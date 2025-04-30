import * as admin from "firebase-admin";

// Ensure the env var exists
const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!firebaseServiceAccount) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not defined."
  );
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(firebaseServiceAccount);
} catch (err) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON.");
}

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casual-web-game-default-rtdb.firebaseio.com/", // Optional
  });
}

// Export what you need
const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
