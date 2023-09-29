import React from 'react';
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { TestContext } from 'react-admin';
import useMutation from 'ra-core/lib/dataProvider/useMutation';
import { ThemeProvider, StyledEngineProvider, createMuiTheme } from '@mui/material';

import ConfirmMutationButton from '../ConfirmMutationButton';

jest.mock('ra-core/lib/dataProvider/useMutation');

const buttonLabel = 'Irrevocable action';
const confirmTitle = 'Are you sure?';
const confirmDescription = 'You can not take this action back';
const defaultProps = {
  buttonLabel,
  confirmModalProps: {
    title: confirmTitle,
    content: confirmDescription,
  },
};
const getWrapper = (props) =>
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createMuiTheme()}>
        <TestContext>
          <ConfirmMutationButton {...defaultProps} {...props} />
        </TestContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<ConfirmMutationButton />', () => {
  let applyMutationMock;

  beforeEach(() => {
    applyMutationMock = jest.fn();
    useMutation.mockReturnValue([applyMutationMock, { loading: false }]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line max-len
  it('as a user I want to see a confirmation modal when pressing the button because the action I am taking is hard to reverse', async () => {
    const { getByRole, queryByText, getByText } = getWrapper();

    fireEvent.click(getByRole('button', { name: buttonLabel }), {});

    expect(queryByText(confirmTitle)).toBeDefined();
    expect(queryByText(confirmDescription)).toBeDefined();

    fireEvent.click(getByRole('button', { name: 'ra.action.confirm' }), {});

    await waitForElementToBeRemoved(() => getByText(confirmTitle));

    expect(queryByText(confirmTitle)).toBeFalsy();
  });

  // eslint-disable-next-line max-len
  it('as a user I want to be able to cancel my action because I may not be sure if I am ready to complete it', async () => {
    const { getByRole, queryByText, getByText } = getWrapper();

    fireEvent.click(getByRole('button', { name: buttonLabel }), {});
    fireEvent.click(getByRole('button', { name: 'ra.action.cancel' }), {});

    await waitForElementToBeRemoved(() => getByText(confirmTitle));

    expect(queryByText(confirmTitle)).toBeFalsy();
  });

  // eslint-disable-next-line max-len
  it('as a user I do not want to be able to call the action when the mutation is already being executed because that may cause me to see errors', () => {
    const { getByRole } = getWrapper();

    useMutation.mockReturnValueOnce([applyMutationMock, { loading: false }]);
    useMutation.mockReturnValueOnce([applyMutationMock, { loading: true }]);

    fireEvent.click(getByRole('button', { name: buttonLabel }), {});
    fireEvent.click(getByRole('button', { name: 'ra.action.confirm' }), {});
    fireEvent.click(getByRole('button', { name: 'ra.action.confirm' }), {});

    expect(applyMutationMock).toHaveBeenCalledTimes(1);
  });

  describe('implementation details', () => {
    it('should apply mutation with expected parameters on confirm', () => {
      const buttonLabel = 'Irrevocable action';
      const mutation = {
        resource: 'x',
        type: 'EDIT',
        params: { id: '123' },
      };
      const { getByRole } = getWrapper({
        buttonLabel,
        mutation,
      });

      fireEvent.click(getByRole('button', { name: buttonLabel }), {});
      fireEvent.click(getByRole('button', { name: 'ra.action.confirm' }), {});

      expect(useMutation).toHaveBeenCalledWith(mutation, expect.anything());
      expect(applyMutationMock).toHaveBeenCalledTimes(1);
    });
  });
});
