import React from 'react';
import { Grid } from '@material-ui/core';

import KukkuuPageLayout, {
  KukkuuLayoutProps,
} from '../kukkuuPageLayout/KukkuuPageLayout';

const KukkuuCardPageLayout = ({ children, ...rest }: KukkuuLayoutProps) => {
  return (
    <KukkuuPageLayout {...rest}>
      <Grid container direction="column" xs={6} item={true}>
        {children}
      </Grid>
    </KukkuuPageLayout>
  );
};

export default KukkuuCardPageLayout;
