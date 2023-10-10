import React from 'react';
import {
  Toolbar,
  SaveButton,
  DeleteButton,
  useRecordContext,
} from 'react-admin';

import { Venue_venue } from '../../api/generatedTypes/Venue';

const VenueEditToolbar = () => {
  const record = useRecordContext<Venue_venue>();
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
