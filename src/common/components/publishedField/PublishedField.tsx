import React, type { ReactElement, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { useLocaleState, useRecordContext } from 'react-admin';
import get from 'lodash/get';

type Props = {
  emptyText?: string | null;
  source: string;
  render?: (date: Date) => ReactNode;
  className?: string;
};

const PublishedField = ({
  emptyText = null,
  source,
  render,
  className,
}: Props): ReactElement | null => {
  const record = useRecordContext();
  const [locale] = useLocaleState();

  if (!record) return null;

  const sourceData = get(record, source);
  const date = new Date(sourceData);

  return (
    <Typography variant="body2" className={className}>
      {sourceData && render && render(date)}
      {sourceData && !render && date.toLocaleString(locale)}
      {!sourceData && emptyText}
    </Typography>
  );
};

export default PublishedField;
