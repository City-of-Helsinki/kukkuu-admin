import React from 'react';
import { TestContext } from 'react-admin';
import { render, waitFor } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/styles';
import { createMuiTheme } from '@mui/material';

import authorizationService from '../../../authentication/authorizationService';
import EventShowActions from '../EventShowActions';

const defaultProps = {
  data: {
    project: {
      id: '123',
    },
  },
};
const getWrapper = (props) =>
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createMuiTheme()}>
        <TestContext>
          <EventShowActions {...defaultProps} {...props} />
        </TestContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<EventShowActions />', () => {
  it('should render an edit button', () => {
    const { getByRole } = getWrapper();

    expect(getByRole('button', { name: 'ra.action.edit' })).toBeTruthy();
  });

  describe('when the user has publish permissions', () => {
    it('should render event publish button', async () => {
      const { getByRole } = getWrapper({
        permissions: {
          canPublishWithinProject: () => true,
        },
      });

      await waitFor(() =>
        expect(
          getByRole('button', { name: 'events.show.publish.button.label' })
        ).toBeTruthy()
      );
    });
  });

  describe('when the event has an event group', () => {
    const getWrapperWithEvent = (props) =>
      getWrapper({
        data: {
          eventGroup: {
            readyForEventGroupPublishing: true,
            publishedAt: new Date(),
          },
        },
        ...props,
      });

    it('should hide the event publish button', () => {
      const { queryByRole } = getWrapperWithEvent();

      expect(
        queryByRole('button', { name: 'events.show.publish.button.label' })
      ).toBeFalsy();
    });

    it('should show a button for setting the event as ready', () => {
      const { getByLabelText } = getWrapperWithEvent();

      expect(getByLabelText('events.fields.ready.label')).toBeTruthy();
    });
  });

  describe('when the event is published', () => {
    it('the publish button should be hidden', () => {
      const { queryByRole } = getWrapper({
        data: { publishedAt: new Date().toJSON() },
      });

      expect(
        queryByRole('button', {
          name: 'events.show.publish.button.label',
        })
      ).toBeFalsy();
    });

    it('the set ready button should be hidden', () => {
      const { queryByLabelText } = getWrapper({
        data: {
          readyForEventGroupPublishing: true,
          publishedAt: new Date().toJSON(),
        },
      });

      expect(queryByLabelText('events.fields.ready.label')).toBeFalsy();
    });
  });
});
