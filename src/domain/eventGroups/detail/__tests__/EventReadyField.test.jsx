import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'react-admin';

import EventReadyField from '../EventReadyField';

const defaultProps = {};
const getWrapper = (props) =>
  render(
    <ThemeProvider>
      <EventReadyField {...defaultProps} {...props} />
    </ThemeProvider>
  );

describe('<EventReadyField />', () => {
  it('should render ready when event is marked as ready but is not published yet', () => {
    const { getByRole } = getWrapper({
      record: { readyForEventGroupPublishing: true },
    });

    expect(
      getByRole('img', { name: 'events.fields.ready.options.ready' })
    ).toBeTruthy();
  });

  it('should render ready when event is marked as ready and published', () => {
    const { getByRole } = getWrapper({
      record: {
        readyForEventGroupPublishing: true,
        publishedAt: new Date().toJSON(),
      },
    });

    expect(
      getByRole('img', { name: 'events.fields.ready.options.published' })
    ).toBeTruthy();
  });

  it('should render not ready when event is not ready', () => {
    const { getByRole } = getWrapper({
      record: { readyForEventGroupPublishing: false },
    });

    expect(
      getByRole('img', { name: 'events.fields.ready.options.notReady' })
    ).toBeTruthy();
  });
});
