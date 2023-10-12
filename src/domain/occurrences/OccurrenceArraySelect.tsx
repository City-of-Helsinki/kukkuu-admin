import React from 'react';
import {
  SelectArrayInput,
  ReferenceArrayInput,
  useTranslate,
  useInput,
  useChoicesContext,
  RaRecord,
  Identifier,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

import { Occurrence_occurrence as Occurrence } from '../../api/generatedTypes/Occurrence';
import { toShortDateTimeString } from '../../common/utils';

const AllChoice = ({ children, allChoiceLabel, getChoices, ...rest }: any) => {
  const { availableChoices } = useChoicesContext();
  return React.cloneElement(children, {
    ...rest,
    choices: [
      { id: 'all', name: allChoiceLabel },
      ...getChoices(availableChoices),
    ],
  });
};

export function getFilters(
  eventId?: string
): Record<string, string> | undefined {
  if (!eventId) {
    return;
  }

  return {
    eventId,
  };
}

export const getChoices = (records: Occurrence[]) => {
  return (
    records?.map(({ id, time }) => ({
      id,
      name: toShortDateTimeString(new Date(time)),
    })) ?? []
  );
};

export const getValues = (previousValues: string[], nextValues: string[]) => {
  const wasAllSelected = previousValues.includes('all');
  const willHaveOtherValueThanAll = nextValues.length > 0;
  const willHaveNoValue = nextValues.length === 0;
  const allWillBeAdded =
    !previousValues.includes('all') && nextValues.includes('all');

  if (wasAllSelected && willHaveOtherValueThanAll) {
    return nextValues.filter((value: string) => value !== 'all');
  } else if (willHaveNoValue || allWillBeAdded) {
    return ['all'];
  } else {
    return nextValues;
  }
};

type ReferenceArrayInputProps = Parameters<typeof ReferenceArrayInput>[0];
type Props = Omit<ReferenceArrayInputProps, 'children' | 'reference'> & {
  source: string;
  eventId?: string;
  allText: string;
};

const OccurrenceArraySelect = ({ eventId, allText, ...rest }: Props) => {
  const filter = getFilters(eventId);
  const {
    field: { value, name },
  } = useInput({ source: rest.source, name: rest.source });
  const form = useFormContext();
  const t = useTranslate();

  // By default the multi select component does not explicitly have an
  // "all" option. This custom handler implements behavior for the all
  // option.
  // - when the user deselects all choices, all is selected
  // - when the user selects some (other) option (than all), "all"
  //   selection is removed
  // - when the user selects "all", all other choices are removed
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | RaRecord<Identifier>
  ) => {
    // The value is actually an array because we are using a
    // multi select
    const nextValues = e.target.value as unknown as string[];
    const values = getValues(value, nextValues);
    form.setValue(name, values);
  };

  return (
    <ReferenceArrayInput
      {...rest}
      resource="occurrences"
      reference="occurrences"
      filter={filter}
    >
      <AllChoice allChoiceLabel={t(allText)} getChoices={getChoices} {...rest}>
        <SelectArrayInput onChange={handleChange} />
      </AllChoice>
    </ReferenceArrayInput>
  );
};

export default OccurrenceArraySelect;
