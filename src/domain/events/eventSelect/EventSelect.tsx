import React from 'react';
import { SelectInput, ReferenceInput, ReferenceInputProps } from 'react-admin';
// import omit from 'lodash/omit';

type Props = Omit<ReferenceInputProps, 'children' | 'reference'> & {
  source: string;
};

const EventSelect = (props: Props) => {
  const { source, ...rest } = props;
  return (
    <ReferenceInput source={source} resource="events" reference="events">
      <SelectInput optionText="name" {...rest} />
    </ReferenceInput>
  );
};

export default EventSelect;
