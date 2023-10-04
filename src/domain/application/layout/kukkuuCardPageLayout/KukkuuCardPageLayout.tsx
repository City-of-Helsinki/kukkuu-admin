import React from 'react';
import { Grid } from '@mui/material';

import KukkuuPageLayout, {
  KukkuuLayoutProps,
} from '../kukkuuPageLayout/KukkuuPageLayout';

const KukkuuCardPageLayout = ({ children, ...rest }: KukkuuLayoutProps) => {
  return (
    <KukkuuPageLayout {...rest}>
      <Grid container direction="column" xs={6} item>
        {children}
      </Grid>
    </KukkuuPageLayout>
  );
};

export default KukkuuCardPageLayout;
