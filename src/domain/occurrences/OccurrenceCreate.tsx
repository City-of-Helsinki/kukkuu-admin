import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
} from 'react-admin';
import { parse } from 'query-string';
import { Grid } from '@material-ui/core';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';

const OccurrenceCreate = (props: any) => {
  const { event_id: eventId } = parse(props.location.search);
  const redirect = eventId ? `/events/${eventId}/show/1` : 'show';

  return (
    <Grid container direction="column" xs={8} item={true}>
      <Create title="occurrences.create.title" {...props}>
        <SimpleForm
          variant="outlined"
          initialValues={{ eventId }}
          redirect={redirect}
        >
          <DateTimeTextInput required={true} />
          <ReferenceInput
            label="occurrences.fields.venue.label"
            source="venueId"
            reference="venues"
            validate={[required()]}
            fullWidth
          >
            <SelectInput optionText="translations.FI.name" />
          </ReferenceInput>
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default OccurrenceCreate;
