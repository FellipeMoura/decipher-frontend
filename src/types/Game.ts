// src/types/GameTypes.ts

import { ISticker } from "./Sticker";
import { ITheme } from "./Theme";
import { IUser } from "./User";

// Interface para o Usuário

  
  // Interfaces para Game
  export interface IGame {
    id: number;
    user: IUser;
    theme: ITheme;
    startTime: Date | null;      
    endTime: Date | null;        
    attempts: number | null;    
    finalScore: number | null;  
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ICreateGameDto {
    levelId: number;
    themeId: number;
  }

  export interface IUpdateGameDto {
    startTime?: Date;
    endTime?: Date;
    attempts?: number;
    finalScore?: number;
  }

  export interface IGameResponseDTO {
    gameId: number;
    correctSequence: number[];
    stickers: ISticker[];
    startTime: Date | null;      
    attempts: number | null;    

  }
  
