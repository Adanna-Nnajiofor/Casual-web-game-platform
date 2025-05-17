import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();
const questionsCollection = db.collection("questions");

export const QuestionModel = {
  // Get all questions
  async getAllQuestions() {
    const snapshot = await questionsCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  // Get all questions by category
  async getAllQuestionsByCategory(category: string) {
    const snapshot = await questionsCollection
      .where("category", "==", category)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
