import * as React from 'react';
import { AppBar } from 'react-admin';
import classNames from 'classnames';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Config from '../../../domain/config';
import ProfileProjectDropdown from '../../../domain/profile/ProfileProjectDropdown';
import AppTitle from '../appTitle/AppTitle';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
  highlight: {
    backgroundColor: '#00D7A7 !important',
  },
});

const KukkuuAppBar = ({ className }: { className?: string }) => {
  const classes = useStyles();

  const isTestEnvironment = Config.IS_TEST_ENVIRONMENT;

  return (
    <AppBar
      className={classNames(className, {
        [classes.highlight]: isTestEnvironment,
      })}
    >
      <Typography variant="h6" color="inherit" className={classes.title}>
        <AppTitle />
      </Typography>
      <div className={classes.spacer} />
      <ProfileProjectDropdown />
    </AppBar>
  );
};

export default KukkuuAppBar;
