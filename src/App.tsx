import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider, AuthProvider, DrawerProvider } from './contexts';
import { AppRoutes } from './routes';
import './components/forms/TraducoesYup';
import { SnackbarProvider } from './contexts/SnackBarProvider';
import { Login } from './components/pages/Login';
import { Navbar } from './components/layouts/Navbar';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppThemeProvider>
          <DrawerProvider>
            <BrowserRouter>
              <SnackbarProvider>
                <Navbar>
                  <Login>
                    <AppRoutes />
                  </Login>
                </Navbar>
              </SnackbarProvider>
            </BrowserRouter>
          </DrawerProvider>
        </AppThemeProvider>
      </AuthProvider>
    </Provider>
  )
}
export default App;


