import { MessageChannel } from 'worker_threads';

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App, { getReactAdminResources } from '../App';
import dataProvider from '../../../api/dataProvider';
import type { Permissions } from '../../authentication/authProvider';

// Ignore unpreventable act errors
let console: any;

const project = {
  id: 'project-id',
  name: 'project',
  year: 2024,
};

const myProjectAdminProfile = {
  id: '123',
  myPermissions: {
    publish: true,
    manageEventGroups: true,
    canSendToAllInProject: true,
    viewFamilies: true,
  },
  year: project.year,
  name: project.name,
};

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  global.MessageChannel = MessageChannel;
  console = global.console;
  global.console = {
    ...console,
    error: () => {
      // ignore
    },
  };
});

afterAll(() => {
  global.console = console;
  cleanup();
});

test('renders without crashing', () => {
  vi.spyOn(dataProvider, 'getMyAdminProfile').mockResolvedValue({
    data: {
      id: 'profile-id',
      projects: {
        edges: [
          {
            node: myProjectAdminProfile,
          },
        ],
      },
    },
  });

  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

describe('getReactAdminResources', () => {
  const allResourceNames = [
    'events-and-event-groups',
    'events',
    'venues',
    'occurrences',
    'messages',
    'event-groups',
    'children',
  ];

  const adminPermissionsBase: Permissions = {
    role: 'admin',
    canViewFamiliesWithinProject: function (
      projectId?: string
    ): boolean | null {
      throw new Error('Function not implemented.');
    },
    canPublishWithinProject: function (projectId?: string): boolean | null {
      throw new Error('Function not implemented.');
    },
    canManageEventGroupsWithinProject: function (
      projectId?: string
    ): boolean | null {
      throw new Error('Function not implemented.');
    },
    canSendMessagesToAllRecipientsWithinProject: function (
      projectId?: string
    ): boolean | null {
      throw new Error('Function not implemented.');
    },
  };

  it('should return all resources when user has canViewFamiliesWithinProject permission', () => {
    const resources = getReactAdminResources(project.id, {
      ...adminPermissionsBase,
      canViewFamiliesWithinProject: (projectId?: string) => true,
    });

    expect(resources.length).toBe(allResourceNames.length);
    expect(resources.map((r) => r.name).includes('children')).toBe(true);
    expect(resources).toMatchSnapshot();
  });

  it('should hide the children resource when user does not have canViewFamiliesWithinProject permission', () => {
    const resources = getReactAdminResources(project.id, {
      ...adminPermissionsBase,
      canViewFamiliesWithinProject: (projectId?: string) => false,
    });
    expect(resources.length).toBe(allResourceNames.length - 1);
    expect(resources.map((r) => r.name).includes('children')).toBe(false);
  });
});
