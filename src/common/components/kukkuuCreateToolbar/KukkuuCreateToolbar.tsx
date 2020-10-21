import React from 'react';
import { Toolbar, SaveButton, useTranslate } from 'react-admin';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

function CancelButton(props: any) {
  const t = useTranslate();

  return (
    <Button
      component={Link}
      to={{ pathname: props.basePath }}
      variant="contained"
    >
      {t('ra.action.cancel')}
    </Button>
  );
}

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function KukkuuCreateToolbar(props: any) {
  const classes = useStyles();

  return (
    <Toolbar {...props} className={classes.toolbar}>
      <SaveButton />
      <CancelButton />
    </Toolbar>
  );
}

export default KukkuuCreateToolbar;
