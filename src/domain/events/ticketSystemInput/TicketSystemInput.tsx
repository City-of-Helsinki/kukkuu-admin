import React from 'react';
import type { SelectInputProps } from 'react-admin';
import { SelectInput, useRecordContext } from 'react-admin';

const TicketSystemInput = (props: SelectInputProps) => {
  const record = useRecordContext();
  return <SelectInput disabled={!!record?.publishedAt} {...props} />;
};

export default TicketSystemInput;
