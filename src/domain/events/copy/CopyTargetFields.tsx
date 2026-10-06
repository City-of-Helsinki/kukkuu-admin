import { SelectInput, useInput, required, useTranslate } from 'react-admin';
import { useQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

import type {
  EventGroupsQuery,
  MyAdminProfileQuery,
} from '../../api/generatedTypes/graphql';
import {
  MyAdminProfileDocument,
  EventGroupsDocument,
} from '../../api/generatedTypes/graphql';
import projectService from '../../projects/projectService';
import client from '../../../api/apolloClient/client';

/**
 * Fetches the currently authenticated admin's profile to extract
 * and return the list of projects they have access to.
 */
const useAdminProjects = () => {
  const { data: profileData } = useQuery<MyAdminProfileQuery>(
    MyAdminProfileDocument,
    { client }
  );

  return (
    profileData?.myAdminProfile?.projects?.edges
      ?.map((e) => e?.node)
      .filter(Boolean) || []
  );
};

/**
 * Reads the project selection state from the form, falling back to the globally
 * active project if no project is selected in the form.
 */
const useProjectSelection = () => {
  const { field: projectField } = useInput({
    source: 'projectId',
    defaultValue: projectService.projectId,
  });
  return projectField.value || projectService.projectId;
};

/**
 * Fetches the event groups belonging to the currently selected project.
 *
 * It reads the project selection state from the form, and sets up a side effect
 * to clear the `eventGroupId` form value whenever the selected project changes,
 * so that an invalid event group from a previously selected project isn't submitted.
 */
const useProjectEventGroups = () => {
  const projectId = useProjectSelection();
  const { setValue } = useFormContext();
  const prevProjectId = useRef(projectId);

  useEffect(() => {
    if (prevProjectId.current && prevProjectId.current !== projectId) {
      setValue('eventGroupId', null);
    }
    prevProjectId.current = projectId;
  }, [projectId, setValue]);

  const { data: eventGroupsData } = useQuery<EventGroupsQuery>(
    EventGroupsDocument,
    {
      client,
      variables: { projectId },
      skip: !projectId,
    }
  );

  return (
    eventGroupsData?.eventGroups?.edges?.map((e) => e?.node).filter(Boolean) ||
    []
  );
};

/**
 * Renders the target selection fields for the copy operation.
 *
 * It provides a project selector and, if the resource is an event,
 * an event group selector that is dynamically populated based on the
 * chosen project.
 */
export const CopyTargetFields = ({
  resource,
}: {
  resource: 'events' | 'event-groups';
}) => {
  const translate = useTranslate();
  const projects = useAdminProjects();
  const eventGroups = useProjectEventGroups();

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        bgcolor: '#fff9e6',
        borderRadius: 1,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {translate('events.copy.title')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {translate('events.copy.description')}
      </Typography>
      <SelectInput
        source="projectId"
        choices={projects}
        optionText={(choice) => `${choice.year} ${choice.name}`}
        optionValue="id"
        validate={required()}
        helperText={translate('events.copy.projectHelperText')}
        fullWidth
      />

      {resource === 'events' && (
        <SelectInput
          source="eventGroupId"
          choices={eventGroups}
          optionText="name"
          optionValue="id"
          helperText={translate('events.copy.eventGroupHelperText')}
          fullWidth
        />
      )}
    </Box>
  );
};
