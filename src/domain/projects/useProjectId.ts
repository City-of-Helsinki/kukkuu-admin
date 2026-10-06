import { useSyncExternalStore } from 'react';

import projectService from './projectService';

/**
 * A React hook that returns the active project ID reactively.
 */
export function useProjectId(): string | null {
  return useSyncExternalStore(
    projectService.subscribe,
    () => projectService.projectId
  );
}
