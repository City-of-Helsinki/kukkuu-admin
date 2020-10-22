import React from 'react';
import { CardHeader, CardHeaderProps, makeStyles } from '@material-ui/core';

const useTitleStyles = makeStyles({
  title: {
    paddingLeft: 0,
    paddingTop: '2rem',
    '& .MuiCardHeader-title': {
      fontWeight: 600,
    },
  },
});

const KukkuuPageTitle = (props: CardHeaderProps) => {
  const classes = useTitleStyles();

  return <CardHeader {...props} className={classes.title} />;
};

export default KukkuuPageTitle;
