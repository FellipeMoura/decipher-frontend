import { IGame } from "./Game";

  export interface IAttempt {
    id: number;
    game: IGame;
    sequenceAttempt: number;  // A ordem da tentativa
    correctCount: number;     // Quantos itens foram corretos nessa tentativa
    attemptTime: number;      // Tempo (em segundos) gasto nessa tentativa
  }
  

  export interface ICreateAttemptDto {
    gameId: number;
    sequenceAttempt: string;
    correctCount: number;
    attemptTime: string;
  }

  