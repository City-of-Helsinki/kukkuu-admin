import React from 'react';
import { Grid } from '@material-ui/core';

const SanitizedGrid = (props: any) => {
  const { basePath, ...sanitizedProps } = props;
  return <Grid {...sanitizedProps} />;
};

export default SanitizedGrid;
