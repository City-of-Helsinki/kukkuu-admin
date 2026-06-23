import * as React from 'react';
import { AppBar } from 'react-admin';
import { Typography } from '@mui/material';

import Config from '../../../domain/config';
import ProfileProjectDropdown from '../../../domain/profile/ProfileProjectDropdown';
import AppTitle from '../appTitle/AppTitle';
import IdleTimer from '../../../domain/authentication/IdleTimer';

const KukkuuAppBar = ({ className }: { className?: string }) => {
  const isTestEnvironment = Config.IS_TEST_ENVIRONMENT;

  /* note: the idle timer is placed here as its the first available shared place for components
     due to the react-admin architecture
  */
  return (
    <AppBar
      className={className}
      sx={
        isTestEnvironment
          ? { backgroundColor: '#00D7A7 !important' }
          : undefined
      }
    >
      <IdleTimer>
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <AppTitle />
        </Typography>
        <div style={{ flex: 1 }} />
        <ProfileProjectDropdown />
      </IdleTimer>
    </AppBar>
  );
};

export default KukkuuAppBar;
