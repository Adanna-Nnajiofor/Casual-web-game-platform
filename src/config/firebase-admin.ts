import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_PATH is not defined in .env");
}

const fullPath = path.resolve(serviceAccountPath);

if (!fs.existsSync(fullPath)) {
  throw new Error(`Service account file not found at path: ${fullPath}`);
}

const serviceAccount = JSON.parse(fs.readFileSync(fullPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casual-web-game-default-rtdb.firebaseio.com",
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
