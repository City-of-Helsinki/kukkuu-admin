import React, { ReactElement, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslate, useLocale } from 'react-admin';
import get from 'lodash/get';

type Props = {
  label: string;
  record?: unknown;
  placeholder?: string | null;
  source: string;
  render?: (date: Date) => ReactNode;
  className?: string;
};

const PublishedField = ({
  record,
  placeholder = null,
  source,
  render,
  className,
}: Props): ReactElement | null => {
  const translate = useTranslate();
  const locale = useLocale();

  if (!record) return null;

  const sourceData = get(record, source) || new Date();
  const date = new Date(sourceData);

  return (
    <Typography variant="body2" className={className}>
      {sourceData && render && render(date)}
      {sourceData && !render && date.toLocaleString(locale)}
      {!sourceData && placeholder && translate(placeholder)}
    </Typography>
  );
};

export default PublishedField;
