import React from 'react';
import * as ReactAdmin from 'react-admin';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles/';

import EventGroupsDetailActions from '../EventGroupsDetailActions';

const defaultContext = {
  data: {
    project: {
      id: '123',
    },
    publishedAt: null,
    events: [
      {
        publishedAt: null,
        readyForEventGroupPublishing: true,
      },
    ],
  },
  permissions: {
    role: 'admin',
    canPublishWithinProject: () => false,
    canManageEventGroupsWithinProject: () => false,
  },
};

const getWrapper = (props) =>
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <ReactAdmin.AdminContext
          dataProvider={{
            getOne: () => Promise.resolve(props?.data),
          }}
        >
          <EventGroupsDetailActions permissions={props?.permissions} />
        </ReactAdmin.AdminContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<EventGroupsDetailActions />', () => {
  it('should show a create button', async () => {
    const context = {
      ...defaultContext,
      permissions: {
        ...defaultContext.permissions,
      },
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: context.permissions,
    });
    getWrapper();

    expect(
      await screen.findByRole('link', {
        name: 'eventGroups.actions.addEvent.do',
      })
    ).toBeInTheDocument();
  });

  it('should show an edit button', () => {
    const context = {
      ...defaultContext,
      permissions: {
        ...defaultContext.permissions,
        canManageEventGroupsWithinProject: () => true,
      },
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: context.permissions,
    });
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

    getWrapper(context);

    expect(
      screen.getByRole('link', { name: 'ra.action.edit' })
    ).toBeInTheDocument();
  });

  it('should render a publish button when there is data and the user has publish permissions', () => {
    const context = {
      ...defaultContext,
      permissions: {
        ...defaultContext.permissions,
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: context.permissions,
    });
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

    getWrapper(context);

    expect(
      screen.getByRole('button', { name: 'eventGroups.actions.publish.do' })
    ).toBeInTheDocument();
  });

  it('should hide publish button when the event group and its events are already published', () => {
    const context = {
      data: {
        project: {
          id: '123',
        },
        publishedAt: new Date().toJSON(),
        events: [
          {
            publishedAt: new Date().toJSON(),
            readyForEventGroupPublishing: true,
          },
        ],
      },
      permissions: {
        role: 'admin',
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: context.permissions,
    });
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

    getWrapper(context);

    expect(
      screen.queryByRole('button', { name: 'eventGroups.actions.publish.do' })
    ).not.toBeInTheDocument();
  });

  it('should render a republish button when there is a mix of unpublished and published event data', async () => {
    const context = {
      data: {
        project: {
          id: '123',
        },
        publishedAt: new Date().toJSON(),
        events: [
          {
            publishedAt: true,
            readyForEventGroupPublishing: true,
          },
          {
            publishedAt: null,
            readyForEventGroupPublishing: true,
          },
        ],
      },
      permissions: {
        role: 'admin',
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: context.permissions,
    });
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);
    getWrapper(context);

    expect(
      await screen.findByRole('button', {
        name: 'eventGroups.actions.publish.redo',
      })
    ).toBeInTheDocument();
  });
});
