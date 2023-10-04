import React from 'react';
import { SelectInput, ReferenceInput } from 'react-admin';
import omit from 'lodash/omit';

// The type is missing from the bundle although the original source
// exports it.
type ReferenceInputProps = Parameters<typeof ReferenceInput>[0];
type Props = Omit<ReferenceInputProps, 'children' | 'reference'> & {
  source: string;
};

// FIXME: types may not work after KK-1017 migration.
// See more https://marmelab.com/react-admin/Upgrade.html#useinput-signature-and-return-value-have-changed
function ignoreNoReferenceErrorWhenEmptyValue(props: any) {
  const {
    meta,
    input: { value },
    emptyValue,
  } = props;

  if (value === emptyValue) {
    return { ...props, meta: omit(meta, 'error') };
  }

  return props;
}

// FIXME: types may not work after KK-1017 migration.
// See more https://marmelab.com/react-admin/Upgrade.html#useinput-signature-and-return-value-have-changed
const HideNoReferenceError = ({ children, ...props }: any) => {
  return React.cloneElement(
    children,
    ignoreNoReferenceErrorWhenEmptyValue(props)
  );
};

const EventSelect = (props: Props) => {
  return (
    <ReferenceInput {...props} resource="events" reference="events">
      <HideNoReferenceError {...props}>
        <SelectInput optionText="name" />
      </HideNoReferenceError>
    </ReferenceInput>
  );
};

export default EventSelect;
