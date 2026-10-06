import type { ReactNode } from 'react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useRecordContext,
  useDataProvider,
  useRefresh,
  Loading,
  useTranslate,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useProjectId } from '../useProjectId';
import projectService from '../projectService';
import authService from '../../authentication/authService';
import type extendedDataProvider from '../../../api/dataProvider';
import RelayList from '../../../api/relayList';
import type {
  ProjectNode,
  ProjectNodeConnection,
} from '../../api/generatedTypes/graphql';

const ProjectList = RelayList<ProjectNode>();

export interface ProjectContextGuardProps {
  record?: { project?: { id?: string } | null };
  children: ReactNode;
}

/**
 * A wrapper component that ensures the user's active project context matches
 * the project associated with the current record (e.g., Event or EventGroup).
 *
 * If the active project differs from the record's project, it prevents the
 * children from rendering and instead displays a modal. The modal informs
 * the user of the mismatch and offers an action to switch their active project
 * (if they have access) or navigate back to the dashboard.
 */
export const ProjectContextGuard = ({
  record,
  children,
}: ProjectContextGuardProps) => {
  const activeId = useProjectId();
  const recordContext = useRecordContext();
  const targetId = record?.project?.id ?? recordContext?.project?.id;
  const navigate = useNavigate();
  const refresh = useRefresh();
  const translate = useTranslate();
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const isAuthenticated = authService.isAuthenticated();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['myAdminProfile'],
    queryFn: dataProvider.getMyAdminProfile,
    enabled:
      isAuthenticated && Boolean(activeId && targetId && activeId !== targetId),
  });

  if (!targetId || !activeId || targetId === activeId) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <Box p={2}>
        <Loading />
      </Box>
    );
  }

  const projects = data?.data?.projects
    ? ProjectList(data.data.projects as ProjectNodeConnection).items
    : [];

  const targetProject = projects.find((p) => p.id === targetId);
  const currentProject = projects.find((p) => p.id === activeId);

  const hasAccess = Boolean(targetProject);

  const handleSwitch = () => {
    projectService.projectId = targetId;
    refresh();
  };

  const handleBack = () => {
    navigate('/');
  };

  const targetProjectName = targetProject
    ? `${targetProject.year} ${targetProject.name}`
    : translate('projects.contextMismatch.unknownProject', {
        _: 'Unknown project',
      });
  const currentProjectName = currentProject
    ? `${currentProject.year} ${currentProject.name}`
    : '';

  // Determine dialog content based on error state
  const title = isError
    ? translate('projects.contextMismatch.errorTitle', {
        _: 'Error loading profile',
      })
    : translate('projects.contextMismatch.title');

  const contentText = isError
    ? translate('projects.contextMismatch.errorContent', {
        _: 'An error occurred while loading your profile to verify project access.',
      })
    : hasAccess
      ? translate('projects.contextMismatch.content', {
          targetProject: targetProjectName,
          currentProject: currentProjectName,
        })
      : translate('projects.contextMismatch.noAccess', {
          targetProject: targetProjectName,
        });

  return (
    <Dialog open={true} disableEscapeKeyDown>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBack} color="primary">
          {translate('projects.contextMismatch.back')}
        </Button>
        {isError ? (
          <Button onClick={() => refetch()} color="primary" variant="contained">
            {translate('projects.contextMismatch.retry', { _: 'Retry' })}
          </Button>
        ) : (
          hasAccess && (
            <Button onClick={handleSwitch} color="primary" variant="contained">
              {translate('projects.contextMismatch.switch')}
            </Button>
          )
        )}
      </DialogActions>
    </Dialog>
  );
};
