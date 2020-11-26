import React, { ChangeEvent } from 'react';
import {
  SelectArrayInput,
  ReferenceArrayInput,
  useTranslate,
} from 'react-admin';
import { useField, useForm } from 'react-final-form';

import { Occurrence_occurrence as Occurrence } from '../../api/generatedTypes/Occurrence';
import { toShortDateTimeString } from '../../common/utils';

const AllChoice = ({
  children,
  choices,
  allChoiceLabel,
  getChoices,
  ...rest
}: any) => {
  return React.cloneElement(children, {
    ...rest,
    choices: [{ id: 'all', name: allChoiceLabel }, ...getChoices(choices)],
  });
};

function getFilters(eventId?: string): Record<string, string> | undefined {
  if (!eventId) {
    return;
  }

  return {
    eventId,
  };
}

type ReferenceArrayInputProps = Parameters<typeof ReferenceArrayInput>[0];
type Props = Omit<ReferenceArrayInputProps, 'children' | 'reference'> & {
  source: string;
  eventId?: string;
  allText: string;
};

const OccurrenceArraySelect = ({ eventId, allText, ...rest }: Props) => {
  const filter = getFilters(eventId);
  const field = useField(rest.source);
  const form = useForm();
  const t = useTranslate();

  // By default the multi select component does not explicitly have an
  // "all" option. This custom handler implements behavior for the all
  // option.
  // - when the user deselects all choices, all is selected
  // - when the user selects some (other) option (than all), "all"
  //   selection is removed
  // - when the user selects "all", all other choices are removed
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const previousValues = field.input.value;
    // The value is actually an array because we are using a
    // multi select
    const nextValues = (e.target.value as unknown) as string[];
    const wasAllSelected = previousValues.includes('all');
    const willHaveOtherValueThanAll = nextValues.length > 0;
    const willHaveNoValue = nextValues.length === 0;
    const allWillBeAdded =
      !previousValues.includes('all') && nextValues.includes('all');

    if (wasAllSelected && willHaveOtherValueThanAll) {
      form.change(
        field.input.name,
        nextValues.filter((value: string) => value !== 'all')
      );
    } else if (willHaveNoValue || allWillBeAdded) {
      form.change(field.input.name, ['all']);
    } else {
      form.change(field.input.name, nextValues);
    }
  };

  const getChoices = (records: Occurrence[]) => {
    return records.map(({ id, time }) => ({
      id,
      name: toShortDateTimeString(new Date(time)),
    }));
  };

  return (
    <ReferenceArrayInput
      {...rest}
      resource="occurrences"
      reference="occurrences"
      filter={filter}
      onChange={handleChange}
    >
      <AllChoice allChoiceLabel={t(allText)} getChoices={getChoices}>
        <SelectArrayInput />
      </AllChoice>
    </ReferenceArrayInput>
  );
};

export default OccurrenceArraySelect;
