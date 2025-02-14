// src/api/services/GameService.ts
import { Api } from '../axios-config';
import { IGame, ICreateGameDto, IUpdateGameDto, IGameResponseDTO } from '../../types/Game';

export const GameService = {
  // Retorna todos os jogos de um usuário a partir do login
  getByUser: async (userLogin: string): Promise<IGame[] | Error> => {
    try {
      const { data } = await Api.get(`/game/user/${userLogin}`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar jogos do usuário.');
    }
  },
  // Retorna um jogo específico pelo id
  getById: async (id: string): Promise<IGame | Error> => {
    try {
      const { data } = await Api.get(`/game/${id}`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar jogo.');
    }
  },
  getActiveGame: async (): Promise<IGameResponseDTO | void | Error> => {
    try {
      const { data } = await Api.get(`/game/active`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao criar jogo.');
    }
  },
  create: async (createGameDto: ICreateGameDto): Promise<IGameResponseDTO | Error> => {
    try {
      const { data } = await Api.post(`/game`, createGameDto);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao criar jogo.');
    }
  },
  // Atualiza um jogo existente
  update: async (id: string, updateGameDto: IUpdateGameDto): Promise<boolean> => {
    try {
      await Api.put(`/game/${id}`, updateGameDto);
      return true;
    } catch (error: any) {
      return false;
    }
  },
  endGame: async (id: string | number): Promise<boolean> => {
    try {
      await Api.put(`/game/${id}`, {endTime:  new Date()});;
      return true;
    } catch (error: any) {
      return false;
    }
  },
};
