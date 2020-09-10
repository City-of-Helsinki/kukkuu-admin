import React from 'react';
import {
  SimpleForm,
  SelectInput,
  ReferenceInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  DeleteWithConfirmButton,
  NumberInput,
  minValue,
  useTranslate,
} from 'react-admin';
import { parse } from 'query-string';
import { Grid } from '@material-ui/core';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import KukkuuEdit from '../../common/components/kukkuuEdit/KukkuuEdit';
import SanitizedGrid from '../../common/components/sanitizedGrid/SanitizedGrid';

const OccurrenceEditToolbar = (props: any) => {
  const redirect = `/events/${props.record.event.id}/show/1`;
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...props}>
      <SaveButton />
      {Boolean(props.record.event.publishedAt) ? (
        <DeleteWithConfirmButton
          confirmTitle="occurrences.edit.delete.confirm.title"
          confirmContent="occurrences.edit.delete.confirm.content"
          redirect={redirect}
        />
      ) : (
        <DeleteButton redirect={redirect} />
      )}
    </Toolbar>
  );
};

const OccurrenceEditDateTimeTextInput = (props: any) => (
  <DateTimeTextInput
    {...props}
    disabled={Boolean(props.record.event.publishedAt)}
  />
);

const OccurrenceEditReferenceInput = (props: any) => {
  return (
    <ReferenceInput
      {...props}
      disabled={Boolean(props.record.event.publishedAt)}
    />
  );
};

const validateCapacityOverride = [minValue(0)];

const OccurrenceEditCapacityOverrideInput = (props: any) => {
  const translate = useTranslate();
  return (
    <SanitizedGrid container spacing={1}>
      <Grid item lg={6}>
        <NumberInput
          {...props}
          style={{ width: '100%' }}
          source="capacityOverride"
          label="occurrences.fields.capacityOverride.label"
          helperText={translate(
            'occurrences.fields.capacityOverride.helperText',
            {
              capacityPerOccurrence: props.record.event.capacityPerOccurrence.toString(),
            }
          )}
          validate={validateCapacityOverride}
        />
      </Grid>
    </SanitizedGrid>
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
      <KukkuuEdit undoable={false} {...props}>
        <SimpleForm
          variant="outlined"
          redirect={redirect}
          toolbar={<OccurrenceEditToolbar redirect={redirect} />}
        >
          <OccurrenceEditDateTimeTextInput required={true} source="time" />
          <OccurrenceEditReferenceInput
            label="occurrences.fields.venue.label"
            source="venue.id"
            reference="venues"
            validate={[required()]}
            fullWidth
          >
            <SelectInput
              optionText="translations.FI.name"
              helperText="occurrences.fields.venue.helperText"
            />
          </OccurrenceEditReferenceInput>
          <OccurrenceEditCapacityOverrideInput />
        </SimpleForm>
      </KukkuuEdit>
    </Grid>
  );
};

export default OccurrenceEdit;
