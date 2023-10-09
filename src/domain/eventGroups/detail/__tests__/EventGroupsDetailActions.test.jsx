import React from 'react';
import { TestContext } from 'react-admin';
import { render } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/styles';
import { createMuiTheme } from '@mui/material';

import EventGroupsDetailActions from '../EventGroupsDetailActions';

const defaultProps = {};
const getWrapper = (props) =>
  render(
    <ThemeProvider theme={createMuiTheme()}>
      <TestContext>
        <EventGroupsDetailActions {...defaultProps} {...props} />
      </TestContext>
    </ThemeProvider>
  );

describe('<EventGroupsDetailActions />', () => {
  it('should show a create button', () => {
    const { getByRole } = getWrapper();

    expect(
      getByRole('button', { name: 'eventGroups.actions.addEvent.do' })
    ).toBeTruthy();
  });

  it('should show an edit button', () => {
    const { getByRole } = getWrapper({
      permissions: {
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    });

    expect(getByRole('button', { name: 'ra.action.edit' })).toBeTruthy();
  });

  it('should render a publish button when there is data and the user has publish permissions', () => {
    const { getByRole } = getWrapper({
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
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    });

    expect(
      getByRole('button', { name: 'eventGroups.actions.publish.do' })
    ).toBeTruthy();
  });

  it('should hide publish button when the event group and its events are already published', () => {
    const { queryByRole } = getWrapper({
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
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    });

    expect(
      queryByRole('button', { name: 'eventGroups.actions.publish.do' })
    ).toBeFalsy();
  });

  it('should render a republish button when there is a mix of unpublished and published event data', () => {
    const { getByRole } = getWrapper({
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
        canPublishWithinProject: () => true,
        canManageEventGroupsWithinProject: () => true,
      },
    });

    expect(
      getByRole('button', { name: 'eventGroups.actions.publish.redo' })
    ).toBeTruthy();
  });
});
