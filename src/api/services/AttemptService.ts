// src/api/services/AttemptService.ts
import { Api } from '../axios-config';
import { IAttempt, ICreateAttemptDto } from '../../types/Attempt';


interface ICreateAttemptResponse {
    isCorrectSequence: boolean;
    id: number;
} 

export const AttemptService = {
  // Retorna uma tentativa pelo id
  getById: async (id: string): Promise<IAttempt | Error> => {
    try {
      const { data } = await Api.get(`/attempt/${id}`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar tentativa.');
    }
  },
  // Cria uma nova tentativa
 
  create: async (createAttemptDto: ICreateAttemptDto): Promise< ICreateAttemptResponse | Error> => {
    try {
      const { data } = await Api.post(`/attempt`, createAttemptDto);
      
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao criar tentativa.');
    }
  },

  // Exclui uma tentativa pelo id
  delete: async (id: string): Promise<boolean> => {
    try {
      await Api.delete(`/attempt/${id}`);
      return true;
    } catch (error: any) {
      return false;
    }
  }
};
