import { LetterPointMap } from '../types/streetz.js';

export function calculateScore(
  correctAnswer: string,
  playerAnswer: string,
  letterPoints: LetterPointMap
): number {
  if (playerAnswer.toLowerCase() !== correctAnswer.toLowerCase()) return 0;

  return [...playerAnswer].reduce((acc, letter) => acc + (letterPoints[letter.toLowerCase()] || 0), 0);
}
