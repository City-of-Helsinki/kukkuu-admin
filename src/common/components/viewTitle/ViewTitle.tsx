import React from 'react';
import { CardHeader } from '@material-ui/core';

const ViewTitle = ({
  basePath,
  record,
  source,
}: {
  basePath?: string;
  record?: any;
  source: string;
}) => {
  const title = `${record.translations.FI.name}`
    ? `${record.translations.FI.name}`
    : '';
  return <CardHeader title={title} />;
};
export default ViewTitle;
