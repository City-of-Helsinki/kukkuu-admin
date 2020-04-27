import get from 'lodash/get';
import React from 'react';

import { Occurrences_occurrences_edges_node as Occurrence } from '../../api/generatedTypes/Occurrences';

export const OccurrenceTimeRangeField = ({
  record,
  locales,
  occurrenceSource,
}: {
  [key: string]: any;
  record?: Occurrence;
  occurrenceSource?: string;
}) => {
  if (!record) {
    return null;
  }
  const options = {
    hour: '2-digit',
    minute: 'numeric',
  };
  const occurrence = occurrenceSource ? get(record, occurrenceSource) : record;
  const start = new Date(Date.parse(occurrence.time));
  const startString = start.toLocaleString(locales, options);
  const duration = occurrence.event.duration;
  if (!duration) {
    return <span>{startString}</span>;
  }
  const end = new Date(start.getTime() + 60000 * duration);
  return (
    <span>{`${startString} – ${end.toLocaleString(locales, options)}`}</span>
  );
};

OccurrenceTimeRangeField.defaultProps = {
  addLabel: true,
  label: 'occurrences.fields.time.fields.time.label',
};
