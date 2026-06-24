import { Login, useTranslate, useLogin } from 'react-admin';
import {
  ThemeProvider,
  StyledEngineProvider,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

import theme from '../../common/materialUI/themeConfig';
import IsTestEnvironmentLabel from '../../common/components/isTestEnvironmentLabel/IsTestEnvironmentLabel';
import Config from '../config';

const LoginPage = () => {
  const translate = useTranslate();
  const login = useLogin();
  const location = useLocation();
  const isTest = Config.IS_TEST_ENVIRONMENT;

  const handleLogin = () => {
    const nextPathname = location.state?.nextPathname ?? '/';

    login(nextPathname === '/login' ? '/' : nextPathname);
  };

  return (
    <Login>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
              >
                <p>
                  {translate('dashboard.title')}
                  <IsTestEnvironmentLabel />
                </p>
                <Button
                  sx={[
                    {
                      marginTop: '1rem',
                      width: '100%',
                    },
                    isTest
                      ? {
                          backgroundColor: '#00D7A7',
                        }
                      : {
                          backgroundColor: null,
                        },
                    isTest
                      ? {
                          '&:hover': {
                            backgroundColor: '#00a17d',
                          },
                        }
                      : {
                          '&:hover': {
                            backgroundColor: null,
                          },
                        },
                  ]}
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
