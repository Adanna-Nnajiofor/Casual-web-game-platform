// scripts/seed.ts
import mongoose from 'mongoose';
import QuestionModel from '../src/models/question.model';
import { LetterPoint } from '../src/models/letterPoint.model';
import connectDB from '../src/config/db';

async function seed() {
  await connectDB();

  await QuestionModel.create({
    questionText: 'Capital of France',
    answer: 'paris',
    scrambled: ['p', 'a', 'r', 'i', 's']
  });

  const letterPoints = [
    { letter: 'a', point: 2 }, { letter: 'b', point: 4 },
    { letter: 'c', point: 3 }, { letter: 'd', point: 1 },
    { letter: 'e', point: 5 }, { letter: 'f', point: 2 },
    { letter: 'g', point: 4 }, { letter: 'h', point: 3 },
    { letter: 'i', point: 1 }, { letter: 'j', point: 6 },
    { letter: 'k', point: 3 }, { letter: 'l', point: 2 },
    { letter: 'm', point: 4 }, { letter: 'n', point: 1 },
    { letter: 'o', point: 5 }, { letter: 'p', point: 3 },
    { letter: 'q', point: 10 }, { letter: 'r', point: 2 },
    { letter: 's', point: 1 }, { letter: 't', point: 2 },
    { letter: 'u', point: 4 }, { letter: 'v', point: 6 },
    { letter: 'w', point: 4 }, { letter: 'x', point: 7 },
    { letter: 'y', point: 3 }, { letter: 'z', point: 9 }
  ];

  await LetterPoint.insertMany(letterPoints);

  console.log('✅ Seeded DB');
  mongoose.disconnect();
}

seed();
