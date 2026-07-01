import {
  AdminContext,
  RecordContextProvider,
  ResourceContextProvider,
  usePermissions,
} from 'react-admin';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import MessageForm from '../MessageForm';
import i18nProvider from '../../../../common/translation/i18nProvider';
import projectService from '../../../projects/projectService';
import { ProtocolType } from '../../../api/generatedTypes/graphql';

vi.mock('react-admin', async () => {
  const actual = await vi.importActual('react-admin');
  return {
    ...actual,
    usePermissions: vi.fn(),
  };
});

const defaultProps = {
  location: {},
  match: {},
};
const getWrapper = (props) =>
  render(
    <AdminContext>
      <MessageForm {...defaultProps} {...props} />
    </AdminContext>
  );

// FIXME: KK-1017. Skipped as quite needless.
// eslint-disable-next-line @vitest/no-disabled-tests
describe.skip('<MessageForm />', () => {
  // eslint-disable-next-line max-len
  it('should not show event select unless the user has chosen some other recipient count than all or invited', async () => {
    getWrapper();

    expect(screen.queryByText('messages.fields.event.label')).toBeFalsy();
    expect(screen.queryAllByText('messages.fields.event.label').length).toBe(0);

    const recipient = await screen.findByRole('combobox', {
      name: 'messages.fields.recipientSelection.label',
    });
    fireEvent.click(recipient);

    const invited = await screen.findByRole('option', {
      name: 'messages.fields.recipientSelection.choices.INVITED.label',
    });
    fireEvent.click(invited);

    expect(screen.queryAllByText('messages.fields.event.label').length).toBe(0);

    fireEvent.click(recipient);

    const enrolled = await screen.findByRole('option', {
      name: 'messages.fields.recipientSelection.choices.ENROLLED.label',
    });
    fireEvent.click(enrolled);

    expect(
      screen.queryAllByText('messages.fields.event.label').length
    ).toBeGreaterThan(0);
  });
});

const CURRENT_PROJECT_ID = 'project-1';

const renderMessageForm = ({ protocol, record } = {}) => {
  const content = (
    <AdminContext i18nProvider={i18nProvider}>
      <ResourceContextProvider value="messages">
        <MessageForm protocol={protocol} />
      </ResourceContextProvider>
    </AdminContext>
  );
  return render(
    record ? (
      <RecordContextProvider value={record}>{content}</RecordContextProvider>
    ) : (
      content
    )
  );
};

describe('<MessageForm /> (protocol and permission branches)', () => {
  beforeEach(() => {
    projectService.projectId = CURRENT_PROJECT_ID;
    usePermissions.mockReturnValue({
      permissions: {
        canSendMessagesToAllRecipientsWithinProject: () => false,
      },
      isLoading: false,
    });
  });

  afterEach(() => {
    projectService.clear();
    vi.clearAllMocks();
  });

  it('renders nothing while permissions are loading', () => {
    usePermissions.mockReturnValue({ permissions: undefined, isLoading: true });

    const { container } = renderMessageForm({ protocol: ProtocolType.Email });

    // The form itself must not render while permissions resolve.
    expect(screen.queryByLabelText(/Vastaanottajat/i)).not.toBeInTheDocument();
    expect(container.querySelector('form')).toBeNull();
  });

  it('renders the subject input, the language tabs, and no SMS notice for Email protocol', async () => {
    renderMessageForm({ protocol: ProtocolType.Email });

    // Subject input appears (Email only).
    await waitFor(() =>
      expect(
        screen.getAllByLabelText(/Viestin otsikko/i).length
      ).toBeGreaterThan(0)
    );

    // Language tabs are visible (FI/EN/SV).
    expect(screen.getByRole('tab', { name: /suomi/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /englanti/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /ruotsi/i })).toBeInTheDocument();

    // The SMS-only notice must not appear.
    expect(
      screen.queryByText(/lähetetään heti, kun klikkaat/i)
    ).not.toBeInTheDocument();
  });

  it('omits the subject input and language tabs and renders the SMS notice for Sms protocol', async () => {
    renderMessageForm({ protocol: ProtocolType.Sms });

    // Body input still renders.
    await waitFor(() =>
      expect(
        screen.getAllByLabelText(/Viestin teksti/i).length
      ).toBeGreaterThan(0)
    );

    // Subject input is Email-only.
    expect(screen.queryByLabelText(/Viestin otsikko/i)).not.toBeInTheDocument();

    // Language tabs are Email-only.
    expect(
      screen.queryByRole('tab', { name: /suomi/i })
    ).not.toBeInTheDocument();

    // The SMS-only notice appears.
    expect(
      screen.getByText(/lähetetään heti, kun klikkaat/i)
    ).toBeInTheDocument();
  });

  it('uses the SMS surface when editing a message whose record.protocol is Sms, regardless of the prop', async () => {
    renderMessageForm({
      protocol: ProtocolType.Email,
      record: { id: 'msg-1', protocol: ProtocolType.Sms },
    });

    await waitFor(() =>
      expect(
        screen.getAllByLabelText(/Viestin teksti/i).length
      ).toBeGreaterThan(0)
    );

    // The record's protocol overrides the prop → no Email subject, no tabs, SMS notice visible.
    expect(screen.queryByLabelText(/Viestin otsikko/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: /suomi/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/lähetetään heti, kun klikkaat/i)
    ).toBeInTheDocument();
  });

  it('offers the ALL recipient option as enabled when the user has the ALL permission', async () => {
    usePermissions.mockReturnValue({
      permissions: {
        canSendMessagesToAllRecipientsWithinProject: () => true,
      },
      isLoading: false,
    });

    renderMessageForm({ protocol: ProtocolType.Email });

    const combobox = await screen.findByRole('combobox', {
      name: /Vastaanottajat/i,
    });
    fireEvent.mouseDown(combobox);

    const allOption = await screen.findByRole('option', {
      name: /messages\.fields\.recipientSelection\.choices\.ALL\.label|Kaikki/i,
    });
    expect(allOption).toBeInTheDocument();
    expect(allOption).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('disables the ALL recipient option when the user lacks the ALL permission', async () => {
    // Uses the default mock from beforeEach: canSendToAll=false
    renderMessageForm({ protocol: ProtocolType.Email });

    const combobox = await screen.findByRole('combobox', {
      name: /Vastaanottajat/i,
    });
    fireEvent.mouseDown(combobox);

    const allOption = await screen.findByRole('option', {
      name: /messages\.fields\.recipientSelection\.choices\.ALL\.label|Kaikki/i,
    });
    expect(allOption).toHaveAttribute('aria-disabled', 'true');
  });
});
