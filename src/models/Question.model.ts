import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();
const questionsCollection = db.collection("questions");

export const QuestionModel = {
  // Fetch random questions by category
  async getRandomQuestionsByCategory(category: string, count: number) {
    console.log(`Querying Firestore for category: ${category}`);
    const snapshot = await questionsCollection
      .where("category", "==", category)
      .get();
    const allQuestions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Shuffle and pick the requested number of questions
    console.log(
      `Found ${allQuestions.length} questions for category: ${category}`
    );
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // Fetch all questions (without filtering by category)
  async getAllQuestions(count: number) {
    console.log("Querying Firestore for all questions");
    const snapshot = await questionsCollection.get();
    const allQuestions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Shuffle and pick the requested number of questions
    console.log(`Found ${allQuestions.length} total questions`);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
};
