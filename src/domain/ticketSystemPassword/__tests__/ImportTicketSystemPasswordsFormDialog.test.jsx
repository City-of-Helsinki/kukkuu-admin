import * as React from 'react';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import { useTranslate, useNotify, useRefresh } from 'react-admin';

import ImportTicketSystemPasswordsFormDialog from '../ImportTicketSystemPasswordsFormDialog';

vi.mock('react-admin', () => ({
  useTranslate: vi.fn(),
  useNotify: vi.fn(),
  useRefresh: vi.fn(),
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

  it('calls onClose when the cancel button is clicked', () => {
    render(<ImportTicketSystemPasswordsFormDialog {...defaultProps} />);
    const cancelButton = screen.getByText(
      'ticketSystemPassword.import.action.cancel'
    );
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
