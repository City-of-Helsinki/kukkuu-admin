import React from 'react';
import { useLogout, useTranslate } from 'react-admin';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
