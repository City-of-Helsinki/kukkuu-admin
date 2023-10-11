import React from 'react';
import { Create, useTranslate } from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import Aside from '../../common/components/aside/Aside';
import VenueForm from './VenueForm';

const VenueCreate = () => {
  const translate = useTranslate();

  return (
    <Grid container direction="column" item>
      <CardHeader title={translate('venues.create.title')} />
      <Create
        aside={<Aside content="venues.create.aside.content" />}
        redirect="show"
      >
        <VenueForm view="create" />
      </Create>
    </Grid>
  );
};

export default VenueCreate;
