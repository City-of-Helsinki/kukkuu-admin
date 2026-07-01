import * as ReactAdmin from 'react-admin';
import { screen, render, waitFor } from '@testing-library/react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { createTheme } from '@mui/material';

import MessageDetailToolbar from '../MessageDetailsToolbar';
import projectService from '../../../projects/projectService';

const CURRENT_PROJECT_ID = 'project-1';

const buildMessage = (overrides = {}) => ({
  id: 'message-1',
  subject: 'Hello',
  recipientCount: 42,
  recipientSelection: 'ENROLLED',
  project: { id: CURRENT_PROJECT_ID },
  ...overrides,
});

const buildPermissions = ({ canSendToAll = false } = {}) => ({
  canSendMessagesToAllRecipientsWithinProject: () => canSendToAll,
});

const getWrapper = () =>
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme()}>
        <ReactAdmin.AdminContext>
          <ReactAdmin.ResourceContextProvider value="messages">
            <MessageDetailToolbar />
          </ReactAdmin.ResourceContextProvider>
        </ReactAdmin.AdminContext>
      </ThemeProvider>
    </StyledEngineProvider>
  );

describe('<MessageDetailToolbar />', () => {
  beforeEach(() => {
    projectService.projectId = CURRENT_PROJECT_ID;
  });

  afterEach(() => {
    projectService.clear();
    vi.restoreAllMocks();
  });

  it('renders nothing when there is no record', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(undefined);
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions(),
      isLoading: false,
    });

    const { container } = getWrapper();

    expect(container.textContent).toBe('');
  });

  it('renders nothing while permissions are loading', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(buildMessage());
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: undefined,
      isLoading: true,
    });

    const { container } = getWrapper();

    expect(container.textContent).toBe('');
  });

  it('renders the sent-state summary (sent-at label + recipient count) when the message has been sent', async () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ sentAt: '2026-01-15T09:30:00Z', recipientCount: 8 })
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions(),
      isLoading: false,
    });

    getWrapper();

    expect(
      await screen.findByText('messages.fields.sentAt.sent')
    ).toBeInTheDocument();
    expect(
      screen.getByText('messages.fields.recipientCount.label')
    ).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument();
    // Buttons must not appear once the message has been sent.
    expect(
      screen.queryByRole('link', { name: 'resources.messages.action.edit' })
    ).not.toBeInTheDocument();
  });

  it('renders edit / delete / send buttons for an unsent message in the current project', async () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(buildMessage());
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: false }),
      isLoading: false,
    });

    getWrapper();

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: 'resources.messages.action.edit' })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole('button', { name: 'resources.messages.action.delete' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'messages.send.do' })
    ).toBeInTheDocument();
  });

  it('renders nothing when an ALL-recipient message meets a user without the ALL permission', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ recipientSelection: 'ALL' })
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: false }),
      isLoading: false,
    });

    const { container } = getWrapper();

    expect(container.textContent).toBe('');
  });

  it('renders nothing when the message belongs to a different project than the active one', () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ project: { id: 'other-project' } })
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: true }),
      isLoading: false,
    });

    const { container } = getWrapper();

    expect(container.textContent).toBe('');
  });

  it('renders the edit toolbar for an ALL-recipient message when the user has the ALL permission', async () => {
    vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValue(
      buildMessage({ recipientSelection: 'ALL' })
    );
    vi.spyOn(ReactAdmin, 'usePermissions').mockReturnValue({
      permissions: buildPermissions({ canSendToAll: true }),
      isLoading: false,
    });

    getWrapper();

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: 'resources.messages.action.edit' })
      ).toBeInTheDocument();
    });
  });
});
