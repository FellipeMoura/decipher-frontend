import { createTheme } from '@mui/material';
import { purple, blue } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#254384',
      dark: '#1a2a3e',
      light: '#1a2a3e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#254384',
      dark: purple[700],
      light: purple[400],
      contrastText: '#ffffff',
    },
    info: {
      main: blue[500],
      dark: blue[700],
      light: blue[400],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#1a2a3e',
      default: '#171d25',
    }
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
