import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useGetOne, usePermissions } from 'react-admin';

import { EventsAndEventGroupsListManagementButtonGroup } from '../ManagementButtonGroup';

vi.mock('react-admin', () => ({
  // eslint-disable-next-line react/prop-types
  CreateButton: ({ resource, label }) => <button>{label}</button>,
  useGetOne: vi.fn(),
  usePermissions: vi.fn(),
}));

vi.mock('../../projects/projectService', () => ({
  projectId: 'test-project-id',
}));

describe('EventsAndEventGroupsListManagementButtonGroup', () => {
  it('renders CreateButton for event groups if user can manage event groups', () => {
    usePermissions.mockReturnValue({
      permissions: {
        canManageEventGroupsWithinProject: vi.fn().mockReturnValue(true),
      },
    });
    useGetOne.mockReturnValue({
      data: { singleEventsAllowed: false },
    });

    render(<EventsAndEventGroupsListManagementButtonGroup />);

    expect(
      screen.getByText('eventGroups.actions.create.do')
    ).toBeInTheDocument();
  });

  it('renders CreateButton for events if single events are allowed', () => {
    usePermissions.mockReturnValue({
      permissions: {
        canManageEventGroupsWithinProject: vi.fn().mockReturnValue(false),
      },
    });
    useGetOne.mockReturnValue({
      data: { singleEventsAllowed: true },
    });

    render(<EventsAndEventGroupsListManagementButtonGroup />);

    expect(screen.getByText('events.actions.create')).toBeInTheDocument();
  });

  it('renders both CreateButtons if conditions are met', () => {
    usePermissions.mockReturnValue({
      permissions: {
        canManageEventGroupsWithinProject: vi.fn().mockReturnValue(true),
      },
    });
    useGetOne.mockReturnValue({
      data: { singleEventsAllowed: true },
    });

    render(<EventsAndEventGroupsListManagementButtonGroup />);

    expect(
      screen.getByText('eventGroups.actions.create.do')
    ).toBeInTheDocument();
    expect(screen.getByText('events.actions.create')).toBeInTheDocument();
  });

  it('renders no CreateButtons if conditions are not met', () => {
    usePermissions.mockReturnValue({
      permissions: {
        canManageEventGroupsWithinProject: vi.fn().mockReturnValue(false),
      },
    });
    useGetOne.mockReturnValue({
      data: { singleEventsAllowed: false },
    });

    render(<EventsAndEventGroupsListManagementButtonGroup />);

    expect(
      screen.queryByText('eventGroups.actions.create.do')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('events.actions.create')).not.toBeInTheDocument();
  });
});
