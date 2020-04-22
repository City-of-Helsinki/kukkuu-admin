import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  DateTimeInput,
} from 'react-admin';
import { parse } from 'query-string';

const OccurrenceCreate = (props: any) => {
  const { event_id: eventId } = parse(props.location.search);
  const redirect = eventId ? `/events/${eventId}/show/1` : 'show';

  return (
    <Create title="occurrences.create.title" {...props}>
      <SimpleForm initialValues={{ eventId }} redirect={redirect}>
        <DateTimeInput label="occurrences.fields.time.label" source="time" />
        <ReferenceInput
          label="occurrences.fields.venues.label"
          source="venueId"
          reference="venues"
        >
          <SelectInput optionText="translations.FI.name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default OccurrenceCreate;
