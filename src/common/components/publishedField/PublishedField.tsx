import React, { ReactElement, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import { useLocale } from 'react-admin';
import get from 'lodash/get';

type Props = {
  label: string;
  record?: unknown;
  emptyText?: string | null;
  source: string;
  render?: (date: Date) => ReactNode;
  className?: string;
};

const PublishedField = ({
  record,
  emptyText = null,
  source,
  render,
  className,
}: Props): ReactElement | null => {
  const locale = useLocale();

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
