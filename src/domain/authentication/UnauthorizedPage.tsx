import React from 'react';
import { useLogout, useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../../common/materialUI/themeConfig';

const useStyles = makeStyles(() => ({
  background: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    background:
      'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
  },
  container: {
    marginTop: '6em',
  },
}));

const UnauthorizedPage = () => {
  const translate = useTranslate();
  const logout = useLogout();
  const classes = useStyles();
  const contactEmail = translate(
    'authentication.unauthorizedPage.contactEmail'
  );
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.background}>
        <Container maxWidth="sm" className={classes.container}>
          <Card style={{ textAlign: 'center' }}>
            <CardHeader
              title={translate('authentication.unauthorizedPage.title')}
            />
            <CardContent>
              {translate('authentication.unauthorizedPage.content')}{' '}
              <a href={'mailto:' + contactEmail}>{contactEmail}</a>
              <Box style={{ marginTop: '2rem' }}>
                <Button variant="contained" color="secondary" onClick={logout}>
                  {translate('ra.auth.logout')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};
export default UnauthorizedPage;
