import React from 'react';
import { CardHeader } from '@mui/material';
import { useRecordContext } from 'react-admin';

const ViewTitle = ({ source }: { source: string }) => {
  const record = useRecordContext();
  const title = `${record.translations.FI.name}`
    ? `${record.translations.FI.name}`
    : '';
  return <CardHeader title={title} />;
};
export default ViewTitle;
