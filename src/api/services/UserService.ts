import { IAuthResponse } from '../../types/User';
import { Api } from '../axios-config';



export const UserService = {
  auth: async (username: string, password: string): Promise<IAuthResponse | Error> => {
    try {
     
      const { data } = await Api.post('/user/auth', { username, password });
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao realizar login.');
    }
  },
  validate: async (): Promise<IAuthResponse | Error> => {
    try {
      const { data } = await Api.get('/user/validate');
      return data;
    } catch (error: any) {
      return new Error(error.message || 'Erro ao validar autenticação.');
    }
  },
  logout: async (): Promise<boolean> => {
    try {
      const { data } = await Api.post('/user/logout', {});
      return data;
    } catch (error: any) {
      return false;
    }
  },
}
