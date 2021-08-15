import React from 'react';
import {
  Create,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
  useGetOne,
} from 'react-admin';
import { parse } from 'query-string';
import Grid from '@material-ui/core/Grid';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import {
  OccurrenceCapacityOverrideInput,
  TicketSystemUrlInput,
} from './inputs';
import { hasInternalTicketSystem } from '../events/utils';
import { AdminEvent } from '../events/types/EventTypes';

const OccurrenceCreate = (props: any) => {
  const eventId = parse(props.location.search).event_id as string;
  const { data: event } = useGetOne<AdminEvent>('events', eventId);
  const internalTicketSystem = hasInternalTicketSystem(event);
  const redirect = eventId ? `/events/${eventId}/show/1` : 'show';

  return (
    <Grid container direction="column" xs={6} item={true}>
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
            <SelectInput
              optionText="translations.FI.name"
              helperText="occurrences.fields.venue.helperText"
            />
          </ReferenceInput>
          {internalTicketSystem ? (
            <OccurrenceCapacityOverrideInput eventId={eventId} />
          ) : (
            <TicketSystemUrlInput />
          )}
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default OccurrenceCreate;
