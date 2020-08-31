import React from 'react';
import { TextField } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  longTextField: { whiteSpace: 'pre-wrap' },
});

const LongTextField = (props: any) => {
  const classes = useStyles();
  return <TextField className={classes.longTextField} {...props} />;
};

export default LongTextField;
