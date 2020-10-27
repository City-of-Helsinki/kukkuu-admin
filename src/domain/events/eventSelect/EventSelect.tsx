import React from 'react';
import {
  ChoicesInputProps,
  TextFieldProps,
  SelectInput,
  useQuery,
} from 'react-admin';

import { Events_events_edges_node as Event } from '../../../api/generatedTypes/Events';

type Choice = {
  id: string;
  name: string;
};

function getOptions(events: Event[]): Choice[] {
  return events.map(({ id, name }) => ({
    id,
    name: name || '',
  }));
}

// react-admin does not export the type for props for SelectInput. In
// version 3.9.4 it used the following type.
type SelectInputProps = ChoicesInputProps<TextFieldProps> &
  Omit<TextFieldProps, 'label' | 'helperText'>;

type Props = Omit<SelectInputProps, 'choices'> & {
  language?: string;
  allowAll?: boolean;
  allLabel?: string;
};

const EventSelect = ({
  allowAll,
  allLabel,
  initialValue: externalInitialValue,
  ...rest
}: Props) => {
  // Due to a reason I could not understand, the useGetList query always
  // returned an empty result.
  const { data, loading, error } = useQuery({
    type: 'getList',
    resource: 'events',
    payload: {
      pagination: {
        page: 1,
        perPage: 1000,
      },
    },
  });

  const isReady = data && !loading && !error;
  const choices = isReady ? getOptions(data) : undefined;
  const initialValue = isReady ? externalInitialValue : undefined;

  return (
    <SelectInput {...rest} initialValue={initialValue} choices={choices} />
  );
};

export default EventSelect;
