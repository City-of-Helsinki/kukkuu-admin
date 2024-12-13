import React from 'react';
import { type TypographyProps, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useTitleStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(1.5),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const KukkuuPageTitle = (props: TypographyProps<'h1'>) => {
  const classes = useTitleStyles();

  return (
    <Typography
      component="h1"
      variant="h5"
      {...props}
      className={classes.title}
    />
  );
};

export default KukkuuPageTitle;
