import React from 'react';
import {
  type ToolbarProps,
  SimpleForm,
  SelectInput,
  ReferenceInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  DeleteWithConfirmButton,
  useRecordContext,
} from 'react-admin';
import { Grid } from '@mui/material';

import DateTimeTextInput from '../../common/components/dateTimeTextField/DateTimeTextField';
import KukkuuEdit from '../application/layout/kukkuuEditPage/KukkuuEdit';
import { OccurrenceCapacityOverrideInput } from './inputs';
import type { OccurrenceNode } from '../api/generatedTypes/graphql';

const OccurrenceEditToolbar = ({
  redirect: redirectPath,
  ...toolbarProps
}: ToolbarProps & { redirect: string }) => {
  const record = useRecordContext<OccurrenceNode>();
  const isPublished = Boolean(record.event.publishedAt);
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...toolbarProps}>
      <SaveButton />
      {isPublished ? (
        <DeleteWithConfirmButton
          confirmTitle="occurrences.edit.delete.confirm.title"
          confirmContent="occurrences.edit.delete.confirm.content"
          redirect={redirectPath}
        />
      ) : (
        <DeleteButton redirect={redirectPath} />
      )}
    </Toolbar>
  );
};

const OccurrenceEditDateTimeTextInput = (props: any) => {
  const record = useRecordContext();
  return (
    <DateTimeTextInput
      {...props}
      disabled={Boolean(record.event.publishedAt)}
    />
  );
};

const OccurrenceEditReferenceInput = (props: any) => {
  const record = useRecordContext();
  return (
    <ReferenceInput {...props} disabled={Boolean(record.event.publishedAt)} />
  );
};

const OccurrenceEditForm = () => {
  const record = useRecordContext<OccurrenceNode>();
  const redirect = record?.event.id
    ? `/events/${record.event.id}/show/1`
    : 'show';

  return (
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
        isRequired
        fullWidth
      >
        <SelectInput
          required
          variant="outlined"
          optionText="translations.FI.name"
          helperText="occurrences.fields.venue.helperText"
        />
      </OccurrenceEditReferenceInput>
      <OccurrenceCapacityOverrideInput />
    </SimpleForm>
  );
};

const OccurrenceEdit = () => {
  // Undoable / mutationMode is false because the DateTimeTextInput returns values
  // that are invalid as time source. They are merged in OccurrenceApi,
  // would be better to move that logic to the fields yes.
  return (
    <Grid container direction="column" item>
      <KukkuuEdit mutationMode="pessimistic" redirect="show">
        <OccurrenceEditForm />
      </KukkuuEdit>
    </Grid>
  );
};

export default OccurrenceEdit;
