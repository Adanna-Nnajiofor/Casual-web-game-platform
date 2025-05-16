import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
// console.log('serviceAccountString:', serviceAccountString)

if (!serviceAccountString) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_JSON is not defined in environment variables"
  );
}

const serviceAccount = JSON.parse(serviceAccountString);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://casual-web-game-default-rtdb.firebaseio.com",
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
