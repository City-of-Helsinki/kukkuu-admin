import * as React from 'react';
import { AppBar } from 'react-admin';

import classNames from 'classnames';

import Config from '../../../domain/config';
import ProfileProjectDropdown from '../../../domain/profile/ProfileProjectDropdown';
import AppTitle from '../appTitle/AppTitle';
import { Typography, makeStyles } from '@mui/material';

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
    backgroundColor: '#00D7A7',
  },
});

const KukkuuAppBar = (props: any) => {
  const classes = useStyles();

  const isTestEnvironment = Config.IS_TEST_ENVIRONMENT;

  return (
    <AppBar
      {...props}
      className={classNames(props.className, {
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
