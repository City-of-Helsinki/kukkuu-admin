import * as React from 'react';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslate, useLogout } from 'react-admin';
import Box from '@mui/material/Box';

import InfoPageTemplate from './InfoPageTemplate';

export default function AuthError() {
  const t = useTranslate();
  const logout = useLogout();

  const handleLogoutButtonClick = () => {
    logout();
  };

  return (
    <InfoPageTemplate
      title={t('authentication.authError.title')}
      content={
        <>
          {t('authentication.authError.description')}
          <Box style={{ marginTop: '2rem' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogoutButtonClick}
              startIcon={<ExitToAppIcon />}
            >
              {t('ra.auth.logout')}
            </Button>
          </Box>
        </>
      }
    />
  );
}
