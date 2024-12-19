import React from 'react';
import Typography from '@mui/material/Typography';
import { useRecordContext, useTranslate } from 'react-admin';

import { type EventNode, Language } from '../api/generatedTypes/graphql';

export const PublishedField = ({
  locale = Language.Fi,
}: {
  locale?: string;
}) => {
  const record = useRecordContext<EventNode>();
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
