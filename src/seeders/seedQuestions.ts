import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();

const questions = [
  {
    question: "What is the capital of Nigeria?",
    options: ["Lagos", "Abuja", "Port Harcourt", "Ibadan"],
    answer: "Abuja",
    category: "History",
  },
  {
    question: "Who sang the hit song 'Ojuelegba'?",
    options: ["Wizkid", "Davido", "Burna Boy", "Tiwa Savage"],
    answer: "Wizkid",
    category: "Music",
  },
  {
    question: "What does 'Sapa' mean in Nigerian slang?",
    options: ["Wealth", "Hunger", "Poverty", "Happiness"],
    answer: "Poverty",
    category: "Slang",
  },
];

async function seed() {
  const batch = db.batch();
  const colRef = db.collection("questions");

  questions.forEach((q) => {
    const docRef = colRef.doc();
    batch.set(docRef, q);
  });

  await batch.commit();
  console.log(" Questions seeded.");
}

seed();
