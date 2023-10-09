import React from 'react';
import { useTranslate } from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import KukkuuEdit from '../../application/layout/kukkuuEditPage/KukkuuEdit';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import EventForm from '../eventForm/EventForm';

const EventEdit = () => {
  const translate = useTranslate();

  // Undoable / mutationMode is false to prevent image from appearing while waiting for backend result.
  return (
    <>
      <CardHeader title={translate('events.edit.title')} />
      <Grid container direction="column" item>
        <KukkuuEdit
          mutationMode={'pessimistic'}
          title={'events.edit.title'}
          redirect="show"
        >
          <ViewTitle />
          <EventForm view="edit" />
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
