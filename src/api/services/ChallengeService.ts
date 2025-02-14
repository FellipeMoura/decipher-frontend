// src/api/services/ChallengeService.ts
import { Api } from '../axios-config';
import { IChallenge, ICreateChallengeDto, IUpdateChallengeDto } from '../../types/Challenge';

export const ChallengeService = {
  // Retorna um desafio pelo id
  getById: async (id: string): Promise<IChallenge | Error> => {
    try {
      const { data } = await Api.get(`/challenge/${id}`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar desafio.');
    }
  },
  // Cria um novo desafio
  create: async (createChallengeDto: ICreateChallengeDto): Promise<IChallenge | Error> => {
    try {
      const { data } = await Api.post(`/challenge`, createChallengeDto);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao criar desafio.');
    }
  },
  // Atualiza um desafio existente
  update: async (id: string, updateChallengeDto: IUpdateChallengeDto): Promise<boolean> => {
    try {
      await Api.put(`/challenge/${id}`, updateChallengeDto);
      return true;
    } catch (error: any) {
      return false;
    }
  },
  // Exclui um desafio pelo id
  delete: async (id: string): Promise<boolean> => {
    try {
      await Api.delete(`/challenge/${id}`);
      return true;
    } catch (error: any) {
      return false;
    }
  }
};
