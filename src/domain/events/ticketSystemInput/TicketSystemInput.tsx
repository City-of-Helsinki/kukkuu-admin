import React from 'react';
import { SelectInput, SelectInputProps, useRecordContext } from 'react-admin';

const TicketSystemInput = (props: SelectInputProps) => {
  const record = useRecordContext();
  return <SelectInput disabled={!!record?.publishedAt} {...props} />;
};

export default TicketSystemInput;
