import React from 'react';
import { useTranslate } from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import KukkuuEdit from '../application/layout/kukkuuEditPage/KukkuuEdit';
import ViewTitle from '../../common/components/viewTitle/ViewTitle';
import VenueForm from './VenueForm';
import TranslatableProvider from '../../common/providers/TranslatableProvider';

const VenueEdit = () => {
  const translate = useTranslate();

  return (
    <>
      <CardHeader title={translate('venues.edit.title')} />
      <Grid container direction="column" item>
        <KukkuuEdit redirect="show">
          <ViewTitle />
          <TranslatableProvider>
            <VenueForm view="edit" />
          </TranslatableProvider>
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default VenueEdit;
