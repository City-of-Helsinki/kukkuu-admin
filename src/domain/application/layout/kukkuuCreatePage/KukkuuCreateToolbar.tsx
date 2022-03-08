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

type Props = React.ComponentProps<typeof Toolbar> & {
  saveLabel?: string;
};

function KukkuuCreateToolbar({ saveLabel, ...delegatedProps }: Props) {
  const classes = useStyles();

  return (
    <Toolbar {...delegatedProps} className={classes.toolbar}>
      <SaveButton label={saveLabel} />
      <CancelButton />
    </Toolbar>
  );
}

export default KukkuuCreateToolbar;
