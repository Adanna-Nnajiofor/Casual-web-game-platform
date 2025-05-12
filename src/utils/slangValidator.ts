import { admin } from "../config/firebase-admin";
const db = admin.firestore();

export async function isValidSlang(word: string): Promise<boolean> {
  const doc = await db.collection("slangs").doc(word.toLowerCase()).get();
  return doc.exists;
}
