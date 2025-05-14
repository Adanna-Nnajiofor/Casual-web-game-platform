import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();
const questionsCollection = db.collection("questions");

export const QuestionModel = {
  // Get all questions
  async getRandomQuestions(count: number) {
    const snapshot = await questionsCollection.get();
    const allQuestions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Shuffle and pick the desired number
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // Get questions by category
  async getRandomQuestionsByCategory(category: string, count: number) {
    const snapshot = await questionsCollection
      .where("category", "==", category)
      .get();

    const allQuestions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
};
