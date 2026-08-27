import * as React from 'react';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import { useTranslate, useNotify, useRefresh } from 'react-admin';

import ImportTicketSystemPasswordsFormDialog from '../ImportTicketSystemPasswordsFormDialog';
import ticketSystemPasswordsApi from '../api/ticketSystemPasswordsApi';

vi.mock('react-admin', () => ({
  useTranslate: vi.fn(),
  useNotify: vi.fn(),
  useRefresh: vi.fn(),
}));

vi.mock('../api/ticketSystemPasswordsApi', () => ({
  default: { importTicketSystemPasswords: vi.fn() },
}));

const mockTranslate = vi.fn();
const mockNotify = vi.fn();
const mockRefresh = vi.fn();

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  record: { id: '1' },
};

describe('ImportTicketSystemPasswordsFormDialog', () => {
  beforeEach(() => {
    useTranslate.mockReturnValue(mockTranslate);
    useNotify.mockReturnValue(mockNotify);
    useRefresh.mockReturnValue(mockRefresh);
    mockTranslate.mockImplementation((key) => key);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dialog title and content text correctly', () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    expect(
      screen.getByText('ticketSystemPassword.import.dialog.title')
    ).toBeInTheDocument();
    expect(
      screen.getByText('ticketSystemPassword.import.dialog.text')
    ).toBeInTheDocument();
  });

  it('renders the textarea and buttons correctly', () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    expect(
      screen.getByPlaceholderText(
        'ticketSystemPassword.import.passwords.placeholder'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('ticketSystemPassword.import.action.cancel')
    ).toBeInTheDocument();
    expect(
      screen.getByText('ticketSystemPassword.import.action.import')
    ).toBeInTheDocument();
  });

  it('calls submitPasswords when the import button is clicked', async () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    const importButton = screen.getByText(
      'ticketSystemPassword.import.action.import'
    );
    fireEvent.click(importButton);
    await waitFor(() => {
      // TODO: Instead of just testing whether it is called or not, we could test the arguments passed to it
      expect(mockNotify).toHaveBeenCalled();
    });
  });

  const clickImport = () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    fireEvent.click(
      screen.getByText('ticketSystemPassword.import.action.import')
    );
  };

  it('notifies success when every password is imported', async () => {
    ticketSystemPasswordsApi.importTicketSystemPasswords.mockResolvedValue({
      data: { errors: [] },
    });
    clickImport();
    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        'ticketSystemPassword.import.submit.success',
        { type: 'info' }
      )
    );
  });

  it('reports only the rejected passwords, without also claiming success', async () => {
    ticketSystemPasswordsApi.importTicketSystemPasswords.mockResolvedValue({
      data: { errors: [{ value: 'bad-password' }] },
    });
    clickImport();
    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        'ticketSystemPassword.import.submit.passwords.error',
        { type: 'warning', passwords: 'bad-password' }
      )
    );
    expect(mockNotify).not.toHaveBeenCalledWith(
      'ticketSystemPassword.import.submit.success',
      { type: 'info' }
    );
  });

  it('notifies an error when the import request fails', async () => {
    ticketSystemPasswordsApi.importTicketSystemPasswords.mockRejectedValue(
      new Error('boom')
    );
    clickImport();
    await waitFor(() =>
      expect(mockNotify).toHaveBeenCalledWith(
        'ticketSystemPassword.import.submit.error',
        { type: 'error' }
      )
    );
    expect(mockNotify).not.toHaveBeenCalledWith(
      'ticketSystemPassword.import.submit.success',
      { type: 'info' }
    );
  });

  it('calls onClose when the cancel button is clicked', () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    const cancelButton = screen.getByText(
      'ticketSystemPassword.import.action.cancel'
    );
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
