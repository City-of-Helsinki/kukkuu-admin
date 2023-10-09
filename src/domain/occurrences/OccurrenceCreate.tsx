import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
  Loading,
} from 'react-admin';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import { OccurrenceCapacityOverrideInput } from './inputs';

const OccurrenceCreateForm = () => {
  const location = useLocation();
  const eventId = new URLSearchParams(location.search).get('event_id');

  if (!eventId) return <Loading />;

  return (
    <SimpleForm defaultValues={{ eventId }}>
      <DateTimeTextInput variant="outlined" required />
      <ReferenceInput
        label="occurrences.fields.venue.label"
        source="venueId"
        reference="venues"
        validate={[required()]}
        fullWidth
      >
        <SelectInput
          variant="outlined"
          optionText="translations.FI.name"
          helperText="occurrences.fields.venue.helperText"
        />
      </ReferenceInput>
      <OccurrenceCapacityOverrideInput eventId={eventId} />
    </SimpleForm>
  );
};

const OccurrenceCreate = () => {
  const location = useLocation();
  const eventId = new URLSearchParams(location.search).get('event_id');
  return (
    <Grid container direction="column" item>
      <Create
        title="occurrences.create.title"
        // FIXME: What is the show/1- URL? Questioned in KK-1017.
        redirect={eventId ? `/events/${eventId}/show/1` : 'show'}
      >
        <OccurrenceCreateForm />
      </Create>
    </Grid>
  );
};

export default OccurrenceCreate;
