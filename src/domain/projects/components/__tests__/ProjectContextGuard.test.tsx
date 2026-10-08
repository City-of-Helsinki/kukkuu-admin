import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as ReactAdmin from 'react-admin';

import { ProjectContextGuard } from '../ProjectContextGuard';
import projectService from '../../projectService';
import { useProjectId } from '../../useProjectId';

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../useProjectId', () => ({
  useProjectId: vi.fn(),
}));

vi.mock('../../../authentication/authService', () => ({
  default: {
    isAuthenticated: () => true,
  },
}));

vi.mock('react-admin', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>;
  return {
    ...mod,
    useTranslate: () => (key: string) => key,
    useRefresh: vi.fn(),
    useDataProvider: vi.fn(),
    useRecordContext: vi.fn(),
  };
});

describe('ProjectContextGuard', () => {
  const mockNavigate = vi.fn();
  const mockRefresh = vi.fn();
  const mockDataProvider = {
    getMyAdminProfile: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(ReactAdmin.useRefresh).mockReturnValue(mockRefresh);
    vi.mocked(ReactAdmin.useDataProvider).mockReturnValue(
      mockDataProvider as any
    );

    vi.mocked(useQuery).mockReturnValue({
      data: {
        data: {
          projects: {
            edges: [
              { node: { id: 'project-1' } },
              { node: { id: 'project-2' } },
            ],
          },
        },
      },
      isLoading: false,
    } as any);

    vi.mocked(useProjectId).mockReturnValue('project-1');
  });

  const renderComponent = (record?: any) =>
    render(
      <ProjectContextGuard record={record}>
        <div>Child Content</div>
      </ProjectContextGuard>
    );

  it('renders children if record has no project', () => {
    renderComponent({ id: 'some-record' });
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders children if record project matches active context', () => {
    renderComponent({ project: { id: 'project-1' } });
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders prompt if record project mismatches active context and user has access to it', async () => {
    renderComponent({ project: { id: 'project-2' } });

    expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.title')
    ).toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.switch')
    ).toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.back')
    ).toBeInTheDocument();
  });

  it('navigates to dashboard on Back to Dashboard click', () => {
    renderComponent({ project: { id: 'project-2' } });

    fireEvent.click(screen.getByText('projects.contextMismatch.back'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('switches context and refreshes on Switch Project click', () => {
    const setProjectSpy = vi.spyOn(projectService, 'projectId', 'set');
    renderComponent({ project: { id: 'project-2' } });

    fireEvent.click(screen.getByText('projects.contextMismatch.switch'));
    expect(setProjectSpy).toHaveBeenCalledWith('project-2');
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('renders prompt without switch button if user lacks access to the mismatching project', () => {
    renderComponent({ project: { id: 'project-3' } });

    expect(screen.queryByText('Child Content')).not.toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.title')
    ).toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.noAccess')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('projects.contextMismatch.switch')
    ).not.toBeInTheDocument();
    expect(
      screen.getByText('projects.contextMismatch.back')
    ).toBeInTheDocument();
  });
});
