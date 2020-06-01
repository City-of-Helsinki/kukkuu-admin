import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
} from 'react-admin';
import { parse } from 'query-string';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';

const OccurrenceCreate = (props: any) => {
  const { event_id: eventId } = parse(props.location.search);
  const redirect = eventId ? `/events/${eventId}/show/1` : 'show';

  return (
    <Create title="occurrences.create.title" {...props}>
      <SimpleForm initialValues={{ eventId }} redirect={redirect}>
        <DateTimeTextInput required={true} inputName="time" label="Date&Time" />
        <ReferenceInput
          label="occurrences.fields.venue.label"
          source="venueId"
          reference="venues"
          validate={[required()]}
        >
          <SelectInput optionText="translations.FI.name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default OccurrenceCreate;
