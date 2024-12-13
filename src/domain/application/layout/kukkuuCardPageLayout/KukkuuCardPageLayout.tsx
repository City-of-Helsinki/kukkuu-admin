import React from 'react';
import { Grid } from '@mui/material';

import KukkuuPageLayout, type { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';

const KukkuuCardPageLayout = ({ children, ...rest }: KukkuuLayoutProps) => {
  return (
    <KukkuuPageLayout {...rest}>
      <Grid container direction="column" item>
        {children}
      </Grid>
    </KukkuuPageLayout>
  );
};

export default KukkuuCardPageLayout;
