import React from 'react';
import { TextField } from 'react-admin';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles({
  longTextField: { whiteSpace: 'pre-wrap' },
});

const LongTextField = (props: any) => {
  const classes = useStyles();
  return <TextField className={classes.longTextField} {...props} />;
};

LongTextField.defaultProps = {
  // SimpleShowLayout wraps its children in a <Label /> if the child has
  // its addLabel prop set to true.
  addLabel: true,
};

export default LongTextField;
