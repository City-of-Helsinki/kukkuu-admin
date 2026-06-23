import { createTheme } from '@mui/material';
import { defaultTheme } from 'react-admin';

const theme = createTheme({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(defaultTheme as any),
  palette: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(defaultTheme.palette as any),
    primary: {
      main: '#0072c6', // hds-brand-color-coat-of-arms-blue
    },
    secondary: {
      main: '#ffc61e', // hds-brand-color-summer
    },
  },
});

export default theme;
