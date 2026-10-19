import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminContext } from 'react-admin';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import moment from 'moment-timezone';

import i18nProvider from '../../../translation/i18nProvider';
import PublishDialog from '../PublishDialog';

const onConfirm = vi.fn();
const onClose = vi.fn();

const dialog = ({ isOpen = true } = {}) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={createTheme()}>
      <AdminContext i18nProvider={i18nProvider}>
        <PublishDialog
          isOpen={isOpen}
          title="Publish"
          content="events.show.publish.confirm.content"
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </AdminContext>
    </ThemeProvider>
  </StyledEngineProvider>
);

const renderDialog = () => render(dialog());

const getDateInput = () =>
  screen.getByLabelText(/Ilmoittautumisen alkamispäivä/);
const getTimeInput = () =>
  screen.getByLabelText(/Ilmoittautumisen alkamiskellonaika/);
const getConfirmButton = () => screen.getByRole('button', { name: 'Vahvista' });

const fill = async (user, date, time) => {
  await user.type(getDateInput(), date);
  await user.type(getTimeInput(), time);
};

describe('<PublishDialog />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with empty inputs and a disabled confirm button', () => {
    renderDialog();

    expect(getDateInput()).toHaveValue('');
    expect(getTimeInput()).toHaveValue('');
    expect(getConfirmButton()).toBeDisabled();
  });

  it('confirms with a timezone-aware ISO string of the entered local time', async () => {
    const user = userEvent.setup();
    renderDialog();
    const tomorrow = moment().add(1, 'day');

    await fill(user, tomorrow.format('YYYY-MM-DD'), '8:15');
    await user.click(getConfirmButton());

    expect(onConfirm).toHaveBeenCalledWith(
      tomorrow.hours(8).minutes(15).seconds(0).milliseconds(0).toISOString()
    );
  });

  it('rejects a time in the past', async () => {
    const user = userEvent.setup();
    renderDialog();

    await fill(user, moment().subtract(1, 'day').format('YYYY-MM-DD'), '12:00');

    expect(
      screen.getByText(
        'Ilmoittautumisen alkamisaika ei saa olla menneisyydessä'
      )
    ).toBeInTheDocument();
    expect(getConfirmButton()).toBeDisabled();
  });

  it('shows an error for an invalid time format after leaving the field', async () => {
    const user = userEvent.setup();
    renderDialog();

    await fill(user, moment().add(1, 'day').format('YYYY-MM-DD'), '25:99');
    // Tabbing out of the time field blurs it
    await user.tab();

    expect(
      screen.getByText('Kellonaika tulee antaa muodossa tt:mm')
    ).toBeInTheDocument();
    expect(getConfirmButton()).toBeDisabled();
  });

  it('clears the entered values after the dialog has closed', async () => {
    const user = userEvent.setup();
    const { rerender } = renderDialog();
    await fill(user, moment().add(1, 'day').format('YYYY-MM-DD'), '12:00');

    await user.click(screen.getByRole('button', { name: 'Peruuta' }));
    rerender(dialog({ isOpen: false }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    rerender(dialog({ isOpen: true }));

    expect(getDateInput()).toHaveValue('');
    expect(getTimeInput()).toHaveValue('');
  });
});
