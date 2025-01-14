import React from 'react';
import {
  CreateButton,
  useGetOne,
  usePermissions,
  type CreateButtonProps,
} from 'react-admin';

import type { Permissions } from '../../authentication/authProvider';
import projectService from '../../projects/projectService';
import type { ProjectNode } from '../../api/generatedTypes/graphql';

export const EventsAndEventGroupsListManagementButtonGroup = ({
  variant,
}: {
  variant?: CreateButtonProps['variant'];
}) => {
  const { permissions } = usePermissions<Permissions>();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const projectId = projectService.projectId!;
  const { data: projectData } = useGetOne<ProjectNode>('projects', {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: projectId,
  });

  const canManageEventGroups = Boolean(
    permissions?.canManageEventGroupsWithinProject?.(projectId)
  );
  const canAddSingleEvent = Boolean(projectData?.singleEventsAllowed);

  return (
    <>
      {canManageEventGroups && (
        <CreateButton
          key="create-event-groups"
          resource="event-groups"
          label={'eventGroups.actions.create.do'}
          variant={variant}
        />
      )}
      {canAddSingleEvent && (
        <CreateButton
          key="create-events"
          resource="events"
          label={'events.actions.create'}
          variant={variant}
        />
      )}
    </>
  );
};
