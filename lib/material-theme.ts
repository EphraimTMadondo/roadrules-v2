import { createTheme } from '@mui/material/styles';

export const theme = createTheme( {
  typography: {
    fontFamily: '"Montserrat", sans-serif'
  },
  palette: {
    background: {
      default: "transparent"
    },
    primary: {
      main: '#333',
      contrastText: 'rgb(255,255,0)',
    },
    secondary: {
      main: 'rgb(255,255,0)',
      contrastText: '#333',
    },
  },
} );

export const primary = theme.palette.primary;
export const secondary = theme.palette.secondary;
export const success = theme.palette.success;
export const warning = theme.palette.warning;