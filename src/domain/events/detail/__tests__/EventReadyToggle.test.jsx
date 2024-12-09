import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as ReactAdmin from 'react-admin';

import EventReadyToggle from '../EventReadyToggle';

const defaultProps = {
  record: {
    readyForEventGroupPublishing: false,
  },
};
const getWrapper = (props, result = true) => {
  // FIXME: these spies should not be needed with react-admin, because of AdminContext
  vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue({
    ...defaultProps.record,
    ...props?.record,
  });
  return render(
    <ReactAdmin.AdminContext>
      <ReactAdmin.DataProviderContext.Provider
        value={{
          setReady: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1));

            return {
              data: {
                readyForEventGroupPublishing: result,
              },
            };
          },
        }}
      >
        <EventReadyToggle {...props} />
      </ReactAdmin.DataProviderContext.Provider>
    </ReactAdmin.AdminContext>
  );
};

const getInput = ({ getByLabelText }) =>
  getByLabelText('events.fields.ready.label');

describe('<EventReadyToggle />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should use the value it finds from the record as a default value', () => {
    const wrapper = getWrapper({
      record: {
        readyForEventGroupPublishing: true,
      },
    });

    expect(getInput(wrapper)).toHaveProperty('checked', true);
  });

  it('when the user clicks it should instantly change states', async () => {
    const wrapper = getWrapper();

    expect(getInput(wrapper)).toHaveProperty('checked', false);

    React.act(() => {
      fireEvent.click(getInput(wrapper));
    });

    await waitFor(() => {
      expect(getInput(wrapper)).toHaveProperty('checked', true);
    });
  });

  it('should use the result it receives in the response as soon as it is available', async () => {
    const wrapper = getWrapper({}, false);

    React.act(() => {
      fireEvent.click(getInput(wrapper));
    });

    await waitFor(() => {
      expect(getInput(wrapper)).toHaveProperty('checked', true);
    });

    await waitFor(() =>
      expect(getInput(wrapper)).toHaveProperty('checked', false)
    );
  });
});
