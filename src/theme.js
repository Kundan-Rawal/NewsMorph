import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#d32f2f', // Red
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#000000' : '#ffffff',
      paper: mode === 'dark' ? '#121212' : '#f4f4f4',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#aaaaaa' : '#555555',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});