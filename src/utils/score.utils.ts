import { admin } from "../config/firebase-admin";

const db = admin.firestore();

export const calculateTriviaScore = async (
  answers: { questionId: string; selected: string }[]
) => {
  let score = 0;
  let correctAnswers = 0;

  for (const answer of answers) {
    const doc = await db.collection("questions").doc(answer.questionId).get();
    const data = doc.data();
    if (!data) continue;

    const isCorrect = data.answer === answer.selected;
    if (isCorrect) {
      score += 10;
      correctAnswers += 1;
    }
  }

  return { score, correctAnswers, total: answers.length };
};
