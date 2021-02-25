import React from 'react';
import { Login, useTranslate, useLogin } from 'react-admin';
import { Button, Card, CardContent } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { RouteComponentProps, StaticContext } from 'react-router';

import theme from '../../common/materialUI/themeConfig';
import IsTestEnvironmentLabel from '../../common/components/isTestEnvironmentLabel/IsTestEnvironmentLabel';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
  },
});

type Props = RouteComponentProps<
  {},
  StaticContext,
  {
    nextPathname?: string;
  }
>;

const LoginPage = ({ location }: Props) => {
  const classes = useStyles();
  const translate = useTranslate();
  const login = useLogin();

  const handleLogin = () => {
    const nextPathname = location.state?.nextPathname ?? undefined;

    login(nextPathname === '/login' ? '/' : nextPathname);
  };

  return (
    <Login>
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
    </Login>
  );
};

export default LoginPage;
