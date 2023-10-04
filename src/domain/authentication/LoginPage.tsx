import React from 'react';
import { Login, useTranslate, useLogin } from 'react-admin';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router';

import theme from '../../common/materialUI/themeConfig';
import IsTestEnvironmentLabel from '../../common/components/isTestEnvironmentLabel/IsTestEnvironmentLabel';
import Config from '../config';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type StyleProps = {
  isTest: boolean;
};

const useStyles = makeStyles<null, StyleProps>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
    backgroundColor: (props) => (props.isTest ? '#00D7A7' : undefined),
    '&:hover': {
      backgroundColor: (props) => (props.isTest ? '#00a17d' : undefined),
    },
  },
});

const LoginPage = () => {
  const classes = useStyles({ isTest: Config.IS_TEST_ENVIRONMENT });
  const translate = useTranslate();
  const login = useLogin();
  const location = useLocation();

  const handleLogin = () => {
    const nextPathname = location.state?.nextPathname ?? undefined;

    login(nextPathname === '/login' ? '/' : nextPathname);
  };

  return (
    <Login>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <div className={classes.container}>
                <p>
                  {translate('dashboard.title')}
                  <IsTestEnvironmentLabel />
                </p>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleLogin}
                >
                  {translate('ra.auth.sign_in')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </ThemeProvider>
      </StyledEngineProvider>
    </Login>
  );
};

export default LoginPage;
