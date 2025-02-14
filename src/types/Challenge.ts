import { IUser } from "./User";

  export interface IChallenge {
    id: number;
    challenger: IUser;
    challenged?: IUser;
    scoreChallenger: number;
    scoreChallenged?: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // DTO para criação de Challenge
  export interface ICreateChallengeDto {
    challengerId: number;
    challengedId?: number;
    scoreChallenger: number;
    status: string;
  }
  
  // DTO para atualização de Challenge
  export interface IUpdateChallengeDto {
    scoreChallenger?: number;
    scoreChallenged?: number;
    status?: string;
  }
