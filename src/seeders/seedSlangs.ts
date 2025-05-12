import "dotenv/config";
import { admin } from "../config/firebase-admin";

const db = admin.firestore();

const slangs = [
  // Naija Slang
  { word: "wahala", category: "Naija Slang" },
  { word: "sapa", category: "Naija Slang" },
  { word: "abeg", category: "Naija Slang" },
  { word: "chop", category: "Naija Slang" },
  { word: "japa", category: "Naija Slang" },
  { word: "gbasgbos", category: "Naija Slang" },
  { word: "yarn", category: "Naija Slang" },
  { word: "kpatakpata", category: "Naija Slang" },
  { word: "runs", category: "Naija Slang" },
  { word: "omo", category: "Naija Slang" },
  { word: "ehen", category: "Naija Slang" },
  { word: "shege", category: "Naija Slang" },
  { word: "shenk", category: "Naija Slang" },
  { word: "dey play", category: "Naija Slang" },
  { word: "how far", category: "Naija Slang" },

  // Music
  { word: "gbedu", category: "Music" },
  { word: "jam", category: "Music" },
  { word: "vibe", category: "Music" },
  { word: "banger", category: "Music" },
  { word: "hit", category: "Music" },
  { word: "dancehall", category: "Music" },
  { word: "afrobeats", category: "Music" },
  { word: "naijatune", category: "Music" },
  { word: "chorus", category: "Music" },
  { word: "verse", category: "Music" },

  // Food
  { word: "jollof", category: "Food" },
  { word: "suya", category: "Food" },
  { word: "fufu", category: "Food" },
  { word: "efo", category: "Food" },
  { word: "egusi", category: "Food" },
  { word: "akara", category: "Food" },
  { word: "moi moi", category: "Food" },
  { word: "garri", category: "Food" },
  { word: "tuwo", category: "Food" },
  { word: "ofada", category: "Food" },

  // Naija History & Culture
  { word: "zobo", category: "Naija History & Culture" },
  { word: "gele", category: "Naija History & Culture" },
  { word: "agbada", category: "Naija History & Culture" },
  { word: "ofe", category: "Naija History & Culture" },
  { word: "tribe", category: "Naija History & Culture" },
  { word: "oriki", category: "Naija History & Culture" },
  { word: "obi", category: "Naija History & Culture" },
  { word: "emir", category: "Naija History & Culture" },
  { word: "nze", category: "Naija History & Culture" },
  { word: "calabash", category: "Naija History & Culture" },

  // Pop Culture
  { word: "stan", category: "Pop Culture" },
  { word: "influencer", category: "Pop Culture" },
  { word: "clout", category: "Pop Culture" },
  { word: "trend", category: "Pop Culture" },
  { word: "baddie", category: "Pop Culture" },
  { word: "drag", category: "Pop Culture" },
  { word: "cancel", category: "Pop Culture" },
  { word: "cruise", category: "Pop Culture" },
  { word: "soft life", category: "Pop Culture" },
  { word: "finesse", category: "Pop Culture" },

  // Sports
  { word: "goal", category: "Sports" },
  { word: "naija", category: "Sports" },
  { word: "baller", category: "Sports" },
  { word: "pitch", category: "Sports" },
  { word: "striker", category: "Sports" },
  { word: "winger", category: "Sports" },
  { word: "keeper", category: "Sports" },
  { word: "offside", category: "Sports" },
  { word: "dribble", category: "Sports" },
  { word: "ref", category: "Sports" },
];

async function seedSlangs() {
  const batch = db.batch();

  slangs.forEach(({ word, category }) => {
    const docRef = db.collection("slangs").doc(word.toLowerCase());
    batch.set(docRef, { word, category });
  });

  await batch.commit();
  console.log("Slangs seeded successfully!");
}

seedSlangs().catch(console.error);
