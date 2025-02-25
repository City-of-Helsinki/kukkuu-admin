import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTranslate, useLogout } from 'react-admin';
import { vi } from 'vitest';

import AuthError from '../AuthErrorPage';

// Mock react-admin's useTranslate and useLogout
vi.mock('react-admin', async (importOriginal) => ({
  ...(await importOriginal()),
  useTranslate: vi.fn(),
  useLogout: vi.fn(),
}));

// Mock InfoPageTemplate to avoid rendering it in tests
vi.mock('./InfoPageTemplate', () => ({
  __esModule: true,
  default: function MockInfoPageTemplate({ title, content }) {
    return (
      <div data-testid="mock-info-page-template">
        <div data-testid="mock-title">{title}</div>
        <div data-testid="mock-content">{content}</div>
      </div>
    );
  },
}));

describe('AuthError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders correctly with translated content', () => {
    const mockTranslate = vi.fn();
    mockTranslate.mockReturnValueOnce('Auth Error Title');
    mockTranslate.mockReturnValueOnce('Auth Error Description');
    mockTranslate.mockReturnValueOnce('Logout');
    useTranslate.mockReturnValue(mockTranslate);
    useLogout.mockReturnValue(vi.fn());

    render(<AuthError />);

    expect(screen.getByText('Auth Error Title')).toBeInTheDocument();
    expect(screen.getByText('Auth Error Description')).toBeInTheDocument();
  });

  it('calls logout when the logout button is clicked', async () => {
    const mockLogout = vi.fn();
    const mockTranslate = vi.fn();
    mockTranslate.mockReturnValueOnce('Auth Error Title');
    mockTranslate.mockReturnValueOnce('Auth Error Description');
    mockTranslate.mockReturnValueOnce('Logout');
    useTranslate.mockReturnValue(mockTranslate);
    useLogout.mockReturnValue(mockLogout);

    render(<AuthError />);

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
