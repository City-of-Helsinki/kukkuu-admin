import { createTheme } from '@mui/material/styles/';
import { defaultTheme } from 'react-admin';

const theme = createTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: {
      main: '#0072c6', // hds-brand-color-coat-of-arms-blue
    },
    secondary: {
      main: '#ffc61e', // hds-brand-color-summer
    },
  },
});

export default theme;
