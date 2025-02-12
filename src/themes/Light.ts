import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#921a1d',
      dark: '#921a1d',
      light: '#921a1d',
      contrastText: '#ffffff',
    },
    secondary: {
      main: purple[800],
      dark: purple[900],
      light: purple[400],
      contrastText: '#ffffff',
    },
    info: {
      main: blue[700],
      dark: blue[900],
      light: blue[500],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    }
  },
});
