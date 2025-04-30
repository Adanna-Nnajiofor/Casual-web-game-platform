import * as admin from "firebase-admin";

const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!firebaseServiceAccount) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
}

let serviceAccount: admin.ServiceAccount;
try {
  serviceAccount = JSON.parse(firebaseServiceAccount); // Parse the JSON string
} catch (error) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON.");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casual-web-game-default-rtdb.firebaseio.com", // Optional
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
