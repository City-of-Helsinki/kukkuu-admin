import {
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  useRecordContext,
} from 'react-admin';

import type { AdminEvent } from '../types/EventTypes';
import useIsThemePathOptional from './useIsThemePathOptional';

type Props = {
  isEditing: boolean;
};

/**
 * An input component for selecting an event's theme paths.
 *
 * At least one is required when creating an event. When copying, the source
 * event's theme paths are preselected, and at least one must stay selected.
 * When editing, it is required only if the event already has theme paths, so
 * events without any can still be saved. Leaving it empty then keeps them
 * without.
 */
const ThemePathInput = ({ isEditing }: Props) => {
  const record = useRecordContext<AdminEvent>();
  const initialThemePathIds = record?.themePaths?.map(({ id }) => id);
  const isOptional = useIsThemePathOptional(isEditing);

  return (
    <ReferenceArrayInput source="themePathIds" reference="theme-paths">
      <SelectArrayInput
        variant="outlined"
        optionText="name"
        label="events.fields.themePaths.label"
        defaultValue={initialThemePathIds}
        validate={isOptional ? undefined : required()}
        helperText={
          isOptional ? 'events.fields.themePaths.optionalHelperText' : undefined
        }
        fullWidth
      />
    </ReferenceArrayInput>
  );
};

export default ThemePathInput;
