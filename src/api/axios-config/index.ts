import axios from 'axios';
import { responseInterceptor } from './interceptors';
import { Environment } from './environment';

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  withCredentials: true, // garante que os cookies sejam enviados/recebidos
});

// Se desejar, você pode manter outros interceptors, mas remova a parte que acessa localStorage.
Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => Promise.reject(error)
);

export { Api };
