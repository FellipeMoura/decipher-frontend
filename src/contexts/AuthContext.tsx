import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/user/slice';
import { UserService } from '../api/services/UserService';

export interface IAuth {
  username: string;
  password: string;
}

interface IAuthContextData {
  handleLogin: (credentials: IAuth) => Promise<void>;
  handleLogout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoadedAuth: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  // Utilize a função validate do UserService para checar a autenticação
  useEffect(() => {
    async function checkAuth() {
      const result = await UserService.validate();
      if (!(result instanceof Error) && result.authenticated) {
        setIsAuthenticated(true);
        dispatch(login({ login: result.login, name: result.name }));
      } else {
        setIsAuthenticated(false);
      }
      setIsLoaded(true);
    }
    checkAuth();
  }, [dispatch]);

  const handleLogin = useCallback(async (credentials: IAuth) => {
    const result = await UserService.auth(credentials.username, credentials.password);
    if (!(result instanceof Error)) {
      setIsAuthenticated(true);
      
      dispatch(login({ login: result.login, name: result.name }));
    } else {
      setIsAuthenticated(false);
      // Opcional: tratar o erro (exibir mensagem, etc.)
    }
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
      const result = await UserService.logout();
      if (result) {
        setIsAuthenticated(false);
        dispatch(logout());
      }
  }, [dispatch]);

  const isLoadedAuth = useMemo(() => isLoaded, [isLoaded]);

  return (
    <AuthContext.Provider value={{ isLoadedAuth, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
