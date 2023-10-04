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
  useRecordContext,
  ToolbarProps,
} from 'react-admin';
import { Grid } from '@mui/material';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import KukkuuEdit from '../application/layout/kukkuuEditPage/KukkuuEdit';
import { OccurrenceCapacityOverrideInput } from './inputs';
import { Occurrence_occurrence as OccurrenceType } from '../../api/generatedTypes/Occurrence';

const OccurrenceEditToolbar = ({
  redirect,
  ...toolbarProps
}: ToolbarProps & { redirect: string }) => {
  const record = useRecordContext<OccurrenceType>();
  const isPublished = Boolean(record.event.publishedAt);
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...toolbarProps}>
      <SaveButton />
      {isPublished ? (
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

const OccurrenceEdit = () => {
  const record = useRecordContext<OccurrenceType>();
  const redirect = record?.event.id
    ? `/events/${record.event.id}/show/1` // FIXME: Is this really right? Why is the '1' fixed? KK-1017
    : 'show';

  // Undoable / mutationMode is false because the DateTimeTextInput returns values
  // that are invalid as time source. They are merged in OccurrenceApi,
  // would be better to move that logic to the fields yes.
  return (
    <Grid container direction="column" xs={6} item>
      <KukkuuEdit mutationMode="pessimistic" redirect={redirect}>
        <SimpleForm toolbar={<OccurrenceEditToolbar redirect={redirect} />}>
          <OccurrenceEditDateTimeTextInput
            variant="outlined"
            required
            source="time"
          />
          <OccurrenceEditReferenceInput
            variant="outlined"
            label="occurrences.fields.venue.label"
            source="venue.id"
            reference="venues"
            validate={[required()]}
            fullWidth
          >
            <SelectInput
              variant="outlined"
              optionText="translations.FI.name"
              helperText="occurrences.fields.venue.helperText"
            />
          </OccurrenceEditReferenceInput>
          <OccurrenceCapacityOverrideInput />
        </SimpleForm>
      </KukkuuEdit>
    </Grid>
  );
};

export default OccurrenceEdit;
