import React from 'react';
import type { MutationMode, ToolbarProps } from 'react-admin';
import {
  DeleteButton,
  SaveButton,
  Toolbar,
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
