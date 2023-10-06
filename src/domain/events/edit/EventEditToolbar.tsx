import React from 'react';
import {
  DeleteButton,
  MutationMode,
  SaveButton,
  Toolbar,
  ToolbarProps,
  useRecordContext,
} from 'react-admin';

const EventEditToolbar = ({
  mutationMode,
  ...toolbarProps
}: ToolbarProps & { disabled?: boolean; mutationMode?: MutationMode }) => {
  const record = useRecordContext();
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...toolbarProps}>
      <SaveButton />
      <DeleteButton disabled={Boolean(record.occurrences.edges.length)} />
    </Toolbar>
  );
};

export default EventEditToolbar;
