import React from 'react';
import { render } from '@testing-library/react';

import EventReadyField from '../EventReadyField';

const defaultProps = {};
const getWrapper = (props) =>
  render(<EventReadyField {...defaultProps} {...props} />);

describe('<EventReadyField />', () => {
  it('should render ready when event is marked as ready', () => {
    const { getByRole } = getWrapper({
      record: { readyForEventGroupPublishing: true },
    });

    expect(
      getByRole('img', { name: 'events.fields.ready.options.ready' })
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
