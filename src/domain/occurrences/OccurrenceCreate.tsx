import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
} from 'react-admin';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import { OccurrenceCapacityOverrideInput } from './inputs';

const OccurrenceCreate = () => {
  const { event_id: eventId } = useParams();

  return (
    <Grid container direction="column" xs={6} item>
      <Create
        title="occurrences.create.title"
        redirect={eventId ? `/events/${eventId}/show/1` : 'show'}
      >
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
      </Create>
    </Grid>
  );
};

export default OccurrenceCreate;
