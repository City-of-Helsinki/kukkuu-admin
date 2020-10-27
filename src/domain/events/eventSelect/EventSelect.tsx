import React from 'react';
import {
  ChoicesInputProps,
  TextFieldProps,
  SelectInput,
  useQuery,
  useLocale,
} from 'react-admin';

import {
  Events_events_edges_node as Event,
  Events_events_edges_node_translations as EventTranslationNode,
} from '../../../api/generatedTypes/Events';
import { Language } from '../../../api/generatedTypes/globalTypes';

type Translatable<Node> = {
  [L in Language]: Node;
};

type Choice = {
  id: string;
  name: string;
};

function getTranslatableField<Node>(
  translatableField: Translatable<Node>,
  field: keyof Node,
  locale: string
): Node[keyof Node] {
  const language = locale.toUpperCase() as Language;
  const supportedLanguages = Object.keys(translatableField) as Language[];

  if (!supportedLanguages.includes(language)) {
    return translatableField[supportedLanguages[0]][field];
  }

  return translatableField[language][field];
}

function getOptions(events: Event[], locale: string): Choice[] {
  return events.map(({ id, translations }) => ({
    id,
    name: getTranslatableField<EventTranslationNode>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      translations,
      'name',
      locale
    ),
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
  const locale = useLocale();

  const isReady = data && !loading && !error;
  const choices = isReady ? getOptions(data, locale) : undefined;
  const initialValue = isReady ? externalInitialValue : undefined;

  return (
    <SelectInput {...rest} initialValue={initialValue} choices={choices} />
  );
};

export default EventSelect;
