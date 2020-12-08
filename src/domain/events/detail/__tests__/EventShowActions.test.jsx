import React from 'react';
import { TestContext } from 'react-admin';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import Config from '../../../config';
import EventShowActions from '../EventShowActions';

const defaultProps = {
  data: {},
};
const getWrapper = (props) =>
  render(
    <ThemeProvider theme={createMuiTheme()}>
      <TestContext>
        <EventShowActions {...defaultProps} {...props} />
      </TestContext>
    </ThemeProvider>
  );

describe('<EventShowActions />', () => {
  it('should render an edit button', () => {
    const { getByRole } = getWrapper();

    expect(getByRole('button', { name: 'ra.action.edit' })).toBeTruthy();
  });

  it('should render event publish button', () => {
    const { getByRole } = getWrapper();

    expect(
      getByRole('button', { name: 'events.show.publish.button.label' })
    ).toBeTruthy();
  });

  describe('when the event has an event group', () => {
    const getWrapperWithEvent = (props) =>
      getWrapper({
        data: {
          eventGroup: {},
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
      jest
        .spyOn(Config, 'enableEventReadyFeature', 'get')
        .mockReturnValueOnce(true);

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
  });
});
