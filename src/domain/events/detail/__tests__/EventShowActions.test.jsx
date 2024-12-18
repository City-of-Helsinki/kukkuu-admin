import React from 'react';
import * as ReactAdmin from 'react-admin';
import { screen, render } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import EventShowActions from '../EventShowActions';

const defaultContext = {
  data: {
    project: {
      id: '123',
    },
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
          <EventShowActions permissions={props?.permissions} />
        </ReactAdmin.AdminContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<EventShowActions />', () => {
  it('should render an edit button', async () => {
    const context = {
      ...defaultContext,
    };
    // FIXME: these spies should not be needed with react-admin, because of AdminContext
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

    getWrapper(context);

    expect(
      await screen.findByRole('link', { name: 'ra.action.edit' })
    ).toBeInTheDocument();
  });

  describe('when the user has publish permissions', () => {
    it('should render event publish button', async () => {
      const context = {
        ...defaultContext,
        permissions: {
          canPublishWithinProject: () => true,
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
          name: 'events.show.publish.button.label',
        })
      ).toBeInTheDocument();
    });
  });

  describe('when the event has an event group', () => {
    const getWrapperWithEvent = (props) => {
      const context = {
        data: {
          ...defaultContext.data,
          eventGroup: {
            readyForEventGroupPublishing: true,
            publishedAt: new Date(),
          },
        },
        ...props,
      };
      // FIXME: these spies should not be needed with react-admin, because of AdminContext
      vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
        permissions: context.permissions,
      });
      vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);
      return getWrapper(context);
    };

    it('should hide the event publish button', () => {
      getWrapperWithEvent();

      expect(
        screen.queryByRole('button', {
          name: 'events.show.publish.button.label',
        })
      ).not.toBeInTheDocument();
    });

    it('should show a button for setting the event as ready', () => {
      getWrapperWithEvent();

      expect(
        screen.getByLabelText('events.fields.ready.label')
      ).toBeInTheDocument();
    });
  });

  describe('when the event is published', () => {
    it('the publish button should be hidden', () => {
      const context = {
        ...defaultContext,
        data: {
          ...defaultContext.data,
          publishedAt: new Date().toJSON(),
        },
      };

      // FIXME: these spies should not be needed with react-admin, because of AdminContext
      vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
        permissions: context.permissions,
      });
      vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

      getWrapper(context);

      expect(
        screen.queryByRole('button', {
          name: 'events.show.publish.button.label',
        })
      ).not.toBeInTheDocument();
    });

    it('the set ready button should be hidden', () => {
      const context = {
        ...defaultContext,
        data: {
          ...defaultContext.data,
          readyForEventGroupPublishing: true,
          publishedAt: new Date().toJSON(),
        },
      };
      // FIXME: these spies should not be needed with react-admin, because of AdminContext
      vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
        permissions: context.permissions,
      });
      vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(context.data);

      getWrapper(context);

      expect(
        screen.queryByLabelText('events.fields.ready.label')
      ).not.toBeInTheDocument();
    });
  });
});
