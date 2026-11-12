import {
  ReferenceArrayInput,
  SelectArrayInput,
  useRecordContext,
} from 'react-admin';

import type { OccurrenceNode } from '../api/generatedTypes/graphql';

/**
 * Input component for selecting occurrence's accessibilities.
 */
const AccessibilityInput = () => {
  const record = useRecordContext<Pick<OccurrenceNode, 'accessibilities'>>();
  const initialAccessibilityIds = record?.accessibilities?.map(({ id }) => id);

  return (
    <ReferenceArrayInput source="accessibilityIds" reference="accessibilities">
      <SelectArrayInput
        variant="outlined"
        optionText="name"
        label="occurrences.fields.accessibilities.label"
        defaultValue={initialAccessibilityIds}
        fullWidth
      />
    </ReferenceArrayInput>
  );
};

export default AccessibilityInput;
