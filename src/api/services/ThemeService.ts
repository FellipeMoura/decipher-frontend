// src/api/services/ThemeService.ts
import { Api } from '../axios-config';
import { ITheme } from '../../types/Theme';

export const ThemeService = {
  // Retorna todos os temas
  getAll: async (): Promise<ITheme[] | Error> => {
    try {
      const { data } = await Api.get(`/theme`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar temas.');
    }
  },
  // Retorna um tema pelo id
  getById: async (id: string): Promise<ITheme | Error> => {
    try {
      const { data } = await Api.get(`/theme/${id}`);
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao buscar tema.');
    }
  },
 
  delete: async (id: string): Promise<boolean> => {
    try {
      await Api.delete(`/theme/${id}`);
      return true;
    } catch (error: any) {
      return false;
    }
  }
};
