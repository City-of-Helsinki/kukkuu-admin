import React from 'react';
import {
  ChoicesInputProps,
  TextFieldProps,
  SelectInput,
  ReferenceInput,
} from 'react-admin';

// react-admin does not export the type for props for SelectInput. In
// version 3.9.4 it used the following type.
type SelectInputProps = ChoicesInputProps<TextFieldProps> &
  Omit<TextFieldProps, 'label' | 'helperText'>;

// The type is missing from the bundle although the original source
// exports it.
type ReferenceInputProps = Parameters<typeof ReferenceInput>[0];
type Props = Omit<ReferenceInputProps, 'children' | 'reference'> & {
  source: string;
};

const EventSelect = (props: Props) => {
  return (
    <ReferenceInput {...props} resource="events" reference="events">
      <SelectInput optionText="name" />
    </ReferenceInput>
  );
};

export default EventSelect;
