import React from 'react';
import { useLogout, useTranslate } from 'react-admin';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import InfoPageTemplate from './InfoPageTemplate';

const UnauthorizedPage = () => {
  const translate = useTranslate();
  const logout = useLogout();
  const contactEmail = translate(
    'authentication.unauthorizedPage.contactEmail'
  );
  return (
    <InfoPageTemplate
      title={translate('authentication.unauthorizedPage.title')}
      content={
        <>
          {translate('authentication.unauthorizedPage.content')}{' '}
          <a href={'mailto:' + contactEmail}>{contactEmail}</a>
          <Box style={{ marginTop: '2rem' }}>
            <Button variant="contained" color="secondary" onClick={logout}>
              {translate('ra.auth.logout')}
            </Button>
          </Box>
        </>
      }
    />
  );
};
export default UnauthorizedPage;
