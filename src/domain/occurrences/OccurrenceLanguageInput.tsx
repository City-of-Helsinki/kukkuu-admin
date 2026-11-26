import {
  ReferenceArrayInput,
  required,
  SelectArrayInput,
  useRecordContext,
} from 'react-admin';

import type { OccurrenceNode } from '../api/generatedTypes/graphql';

const occurrenceLanguageFilter = { canBeOccurrenceLanguage: true };
const requireAtLeastOneLanguage = [required()];

/**
 * Input component for selecting occurrence's languages. At least one language
 * is required.
 */
const OccurrenceLanguageInput = () => {
  const record = useRecordContext<Pick<OccurrenceNode, 'languages'>>();
  const initialLanguageIds = record?.languages?.map(({ id }) => id);

  return (
    <ReferenceArrayInput
      source="languageIds"
      reference="languages"
      filter={occurrenceLanguageFilter}
    >
      <SelectArrayInput
        variant="outlined"
        optionText="name"
        label="occurrences.fields.languages.label"
        defaultValue={initialLanguageIds}
        validate={requireAtLeastOneLanguage}
        fullWidth
      />
    </ReferenceArrayInput>
  );
};

export default OccurrenceLanguageInput;
