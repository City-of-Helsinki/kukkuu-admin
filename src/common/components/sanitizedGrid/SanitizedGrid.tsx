import React from 'react';
import { Grid } from '@mui/material';

const SanitizedGrid = (props: any) => {
  const { basePath, ...sanitizedProps } = props;
  return <Grid {...sanitizedProps} />;
};

export default SanitizedGrid;
