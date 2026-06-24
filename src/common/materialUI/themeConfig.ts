import { createTheme } from '@mui/material';
import { defaultTheme } from 'react-admin';

// RA5's defaultTheme.shape.borderRadius is typed `string | number` but MUI's
// createTheme expects `number`. Cast is unavoidable until RA narrows the type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const theme = createTheme({
  ...(defaultTheme as any),
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
