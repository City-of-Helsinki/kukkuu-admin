import React from 'react';
import {
  Edit,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';
import { parse } from 'query-string';
import { Grid } from '@material-ui/core';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';

const OccurrenceEditTitle = ({ record }: any) => {
  return (
    // TODO make translatable
    <span>{'Muokkaa ajankohta'}</span>
  );
};

const OccurrenceEditToolbar = (props: any) => {
  const redirect = `/events/${props.record.event.id}/show/1`;
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...props}>
      <SaveButton />
      <DeleteButton disabled={false} redirect={redirect} />
    </Toolbar>
  );
};

const OccurrenceEdit = (props: any) => {
  const { event_id: eventId } = parse(props.location.search);
  const redirect = eventId ? `/events/${eventId}/show/1` : 'show';

  // Undoable is false because the DateTimeTextInput returns values
  // that are invalid as time source. They are merged in OccurrenceApi,
  // would be better to move that logic to the fields yes.
  return (
    <Grid container direction="column" xs={6} item={true}>
      <Edit title={<OccurrenceEditTitle />} undoable={false} {...props}>
        <SimpleForm
          variant="outlined"
          redirect={redirect}
          toolbar={<OccurrenceEditToolbar redirect={redirect} />}
        >
          <DateTimeTextInput required={true} source="time" />
          <ReferenceInput
            label="occurrences.fields.venue.label"
            source="venue.id"
            reference="venues"
            validate={[required()]}
            fullWidth
          >
            <SelectInput optionText="translations.FI.name" />
          </ReferenceInput>
        </SimpleForm>
      </Edit>
    </Grid>
  );
};

export default OccurrenceEdit;
