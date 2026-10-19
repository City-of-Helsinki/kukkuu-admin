import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminContext } from 'react-admin';
import { useMutation } from '@tanstack/react-query';
import moment from 'moment-timezone';

import i18nProvider from '../../../translation/i18nProvider';
import PublishDialogButton from '../PublishDialogButton';

const mutationFn = vi.fn();

const TestButton = () => (
  <PublishDialogButton
    buttonLabel="Open"
    mutation={useMutation({ mutationFn })}
    dialogProps={{
      title: 'Publish',
      content: 'events.show.publish.confirm.content',
    }}
  />
);

const getDateInput = () =>
  screen.getByLabelText(/Ilmoittautumisen alkamispäivä/);
const getTimeInput = () =>
  screen.getByLabelText(/Ilmoittautumisen alkamiskellonaika/);
const getConfirmButton = () => screen.getByRole('button', { name: 'Vahvista' });

describe('<PublishDialogButton />', () => {
  it('keeps the dialog open with the entered time when the mutation fails', async () => {
    const user = userEvent.setup();
    const date = moment().add(1, 'day').format('YYYY-MM-DD');
    const { promise, reject } = Promise.withResolvers();
    mutationFn.mockReturnValue(promise);
    render(<TestButton />, {
      wrapper: ({ children }) => (
        <AdminContext i18nProvider={i18nProvider}>{children}</AdminContext>
      ),
    });

    await user.click(screen.getByRole('button', { name: /Open/ }));
    await user.type(getDateInput(), date);
    await user.type(getTimeInput(), '12:00');
    await user.click(getConfirmButton());
    await waitFor(() => expect(getConfirmButton()).toBeDisabled());

    await act(async () => reject(new Error('failed')));

    await waitFor(() => expect(getConfirmButton()).toBeEnabled());
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(getDateInput()).toHaveValue(date);
    expect(getTimeInput()).toHaveValue('12:00');
  });
});
