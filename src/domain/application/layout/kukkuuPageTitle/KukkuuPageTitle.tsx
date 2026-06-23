import React from 'react';
import { type TypographyProps, Typography } from '@mui/material';

const KukkuuPageTitle = (props: TypographyProps<'h1'>) => {
  return (
    <Typography
      component="h1"
      variant="h5"
      {...props}
      sx={(theme) => ({
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(1.5),
        fontWeight: theme.typography.fontWeightBold,
      })}
    />
  );
};

export default KukkuuPageTitle;
