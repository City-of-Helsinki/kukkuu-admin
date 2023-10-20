import get from 'lodash/get';
import React from 'react';
import Typography from '@mui/material/Typography';
import { useRecordContext } from 'react-admin';

import { Occurrences_occurrences_edges_node as OccurrenceType } from '../../../api/generatedTypes/Occurrences';
import Occurrence from '../Occurrence';

const OccurrenceTimeRangeField = ({
  occurrenceSource,
}: {
  occurrenceSource?: string;
}) => {
  const record = useRecordContext<OccurrenceType>();
  if (!record) {
    return null;
  }

  const occurrenceData = occurrenceSource
    ? get(record, occurrenceSource)
    : record;
  const occurrence = new Occurrence(occurrenceData);

  return (
    <Typography variant="body2" component="span">
      {occurrence.duration ? occurrence.duration : occurrence.startTime}
    </Typography>
  );
};

OccurrenceTimeRangeField.defaultProps = {
  label: 'occurrences.fields.time.fields.time.label',
};

export default OccurrenceTimeRangeField;
