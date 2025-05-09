export interface Question {
    id: string;
    questionText: string;
    answer: string;
    scrambled: string[];
  }
  
  export interface LetterPointMap {
    [letter: string]: number;
  }
  
  export interface SubmitRequestBody {
    questionId: string;
    playerAnswer: string;
  }