import React from 'react';
import { CardHeader, CardHeaderProps, makeStyles } from '@material-ui/core';

const useTitleStyles = makeStyles((theme) => ({
  title: {
    paddingLeft: 0,
    paddingTop: theme.spacing(7),
    '& .MuiCardHeader-title': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

const KukkuuPageTitle = (props: CardHeaderProps) => {
  const classes = useTitleStyles();

  return <CardHeader {...props} className={classes.title} />;
};

export default KukkuuPageTitle;
