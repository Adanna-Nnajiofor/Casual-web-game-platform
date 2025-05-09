import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();
const questionsCollection = db.collection("questions");

export const QuestionModel = {
  async getRandomQuestionsByCategory(category: string, count: number) {
    const snapshot = await questionsCollection
      .where("category", "==", category)
      .get();
    const allQuestions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Shuffle and pick count questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
};
