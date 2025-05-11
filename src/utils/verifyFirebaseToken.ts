import { auth } from "../config/firebase-admin";

export const verifyFirebaseToken = async (idToken: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error: any) {
    throw new Error(`Firebase token verification failed: ${error.message}`);
  }
};
