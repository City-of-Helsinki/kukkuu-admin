import React from 'react';
import {
  useTranslate,
  CreateButton,
  useGetOne,
  usePermissions,
} from 'react-admin';
import type { CreateButtonProps } from 'react-admin';

import type { Permissions } from '../../authentication/authProvider';
import projectService from '../../projects/projectService';
import type { ProjectNode } from '../../api/generatedTypes/graphql';

export const EventsAndEventGroupsListManagementButtonGroup = ({
  variant,
}: {
  variant?: CreateButtonProps['variant'];
}) => {
  const t = useTranslate();
  const { permissions } = usePermissions<Permissions>();
  const { data: projectData } = useGetOne<ProjectNode>('projects', {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: projectService.projectId!,
  });

  const canManageEventGroups = Boolean(
    permissions?.canManageEventGroupsWithinProject(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      projectService.projectId!
    )
  );
  const canAddSingleEvent = Boolean(projectData?.singleEventsAllowed);

  return (
    <>
      {canManageEventGroups && (
        <CreateButton
          key="create-event-groups"
          resource="event-groups"
          label={t('eventGroups.actions.create.do')}
          variant={variant}
        />
      )}
      {canAddSingleEvent && (
        <CreateButton
          key="create-events"
          resource="events"
          label={t('events.actions.create')}
          variant={variant}
        />
      )}
    </>
  );
};
