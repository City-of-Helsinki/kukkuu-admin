import { createMuiTheme } from '@mui/material/styles';

import { adaptV4Theme } from '@mui/material/styles';

const theme = createMuiTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#0072c6', // hds-brand-color-coat-of-arms-blue
    },
    secondary: {
      main: '#ffc61e', // hds-brand-color-summer
    },
  },
}));

export default theme;
