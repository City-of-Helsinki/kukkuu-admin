import React from 'react';
import {
  screen,
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AdminContext } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles/';

import ConfirmMutationButton from '../ConfirmMutationButton';

jest.mock('../../../../domain/messages/hooks/useMessageSendMutation');

const buttonLabel = 'Irrevocable action';
const confirmTitle = 'Are you sure?';
const confirmDescription = 'You can not take this action back';
const applyMutationMock = jest.fn(() => {
  // eslint-disable-next-line no-console
  console.log('applyMutationMock called');
});
const defaultProps = {
  mutation: {
    mutate: applyMutationMock,
    isLoading: false,
  },
  buttonLabel,
  confirmModalProps: {
    title: confirmTitle,
    content: confirmDescription,
  },
};
const getWrapper = (props) =>
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <AdminContext>
          <ConfirmMutationButton {...defaultProps} {...props} />
        </AdminContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<ConfirmMutationButton />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line max-len
  it('as a user I want to see a confirmation modal when pressing the button because the action I am taking is hard to reverse', async () => {
    getWrapper();

    fireEvent.click(screen.getByRole('button', { name: buttonLabel }), {});

    expect(screen.queryByText(confirmTitle)).toBeDefined();
    expect(screen.queryByText(confirmDescription)).toBeDefined();

    fireEvent.click(
      screen.getByRole('button', { name: 'ra.action.confirm' }),
      {}
    );

    await waitForElementToBeRemoved(() => screen.getByText(confirmTitle));

    expect(screen.queryByText(confirmTitle)).toBeFalsy();
  });

  // eslint-disable-next-line max-len
  it('as a user I want to be able to cancel my action because I may not be sure if I am ready to complete it', async () => {
    getWrapper();

    fireEvent.click(screen.getByRole('button', { name: buttonLabel }), {});
    fireEvent.click(
      screen.getByRole('button', { name: 'ra.action.cancel' }),
      {}
    );

    await waitForElementToBeRemoved(() => screen.getByText(confirmTitle));

    expect(screen.queryByText(confirmTitle)).toBeFalsy();
  });
});
