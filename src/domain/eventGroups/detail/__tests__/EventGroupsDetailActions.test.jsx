import React from 'react';
import { TestContext } from 'react-admin';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

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

  it('should hide publish button when the event group is already published', () => {
    const { queryByRole } = getWrapper({
      data: { publishedAt: new Date().toJSON() },
    });

    expect(
      queryByRole('button', { name: 'eventGroups.actions.publish.do' })
    ).toBeFalsy();
  });
});
