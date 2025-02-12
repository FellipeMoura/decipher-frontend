import { AxiosResponse, AxiosError } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const errorInterceptor = (error: AxiosError) => {

  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    return Promise.reject( new Error(String(error.response?.data) || 'Erro desconhecido.'));
  }
  //alert(error.response?.data);
  return Promise.reject( new Error(String(error.response?.data) || 'Erro desconhecido.'));
};