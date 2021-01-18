import React from 'react';
import { useLogout, useTranslate } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const UnauthorizedPage = () => {
  const translate = useTranslate();
  const logout = useLogout();
  const contactEmail = translate(
    'authentication.unauthorizedPage.contactEmail'
  );
  return (
    <Container maxWidth="sm">
      <Card style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CardHeader
          title={translate('authentication.unauthorizedPage.title')}
        />
        <CardContent>
          {translate('authentication.unauthorizedPage.content')}{' '}
          <a href={'mailto:' + contactEmail}>{contactEmail}</a>
          <Box style={{ marginTop: '2rem' }}>
            <Button onClick={logout}>{translate('ra.auth.logout')}</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
export default UnauthorizedPage;
