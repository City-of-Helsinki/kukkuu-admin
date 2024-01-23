import React from 'react';
import {
  Toolbar,
  SaveButton,
  DeleteButton,
  useRecordContext,
} from 'react-admin';

import type { VenueNode } from '../api/generatedTypes/graphql';

const VenueEditToolbar = () => {
  const record = useRecordContext<VenueNode>();
  return (
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <SaveButton />
      <DeleteButton
        disabled={Boolean(record.occurrences?.pageInfo?.startCursor)}
      />
    </Toolbar>
  );
};

export default VenueEditToolbar;
