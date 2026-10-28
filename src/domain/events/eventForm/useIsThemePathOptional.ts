import { useRecordContext } from 'react-admin';

import type { AdminEvent } from '../types/EventTypes';

/**
 * Whether an event may be saved without any theme paths: only when editing an
 * event that has none yet.
 */
const useIsThemePathOptional = (isEditing: boolean) => {
  const record = useRecordContext<AdminEvent>();
  return isEditing && !record?.themePaths?.length;
};

export default useIsThemePathOptional;
