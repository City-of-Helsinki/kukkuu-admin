import React from 'react';
import Typography from '@mui/material/Typography';
import { useRecordContext, useTranslate } from 'react-admin';

import { Events_events_edges_node as Event } from '../../api/generatedTypes/Events';
import { Language } from '../../api/generatedTypes/globalTypes';

export const PublishedField = ({
  locale = Language.FI,
}: {
  locale?: string;
}) => {
  const record = useRecordContext<Event>();
  const translate = useTranslate();
  if (!record) return null;
  const date = new Date(record.publishedAt);
  return (
    <Typography variant="body2">
      {record.publishedAt
        ? date.toLocaleString(locale)
        : translate('events.fields.publishedAt.values.NOT_PUBLISHED')}
    </Typography>
  );
};

PublishedField.defaultProps = {
  label: 'events.fields.publishedAt.label',
};
