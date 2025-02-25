import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useLogout, useTranslate } from 'react-admin';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import UnauthorizedPage from '../UnauthorizedPage';

// Mock the dependencies
vi.mock('react-admin', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLogout: vi.fn(),
    useTranslate: vi.fn(),
  };
});

// Mock mailto link behavior
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock InfoPageTemplate
vi.mock('./InfoPageTemplate', () => ({
  __esModule: true,
  default: ({ title, content }) => (
    <div data-testid="info-page-template">
      <div data-testid="info-page-title">{title}</div>
      <div data-testid="info-page-content">{content}</div>
    </div>
  ),
}));

describe('UnauthorizedPage', () => {
  const queryClient = new QueryClient();

  const useTranslateMock = (key) => {
    switch (key) {
      case 'authentication.unauthorizedPage.title':
        return 'Unauthorized Title';
      case 'authentication.unauthorizedPage.content':
        return 'Unauthorized Content';
      case 'authentication.unauthorizedPage.contactEmail':
        return 'test@example.com';
      case 'ra.auth.logout':
        return 'Logout';
      default:
        return key;
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the UnauthorizedPage with correct content', () => {
    const mockTranslate = vi.fn(useTranslateMock);
    useTranslate.mockReturnValue(mockTranslate);
    useLogout.mockReturnValue(vi.fn());

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UnauthorizedPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Unauthorized Title')).toBeInTheDocument();
    expect(screen.getByText('Unauthorized Content')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    expect(link).toHaveTextContent('test@example.com');

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Logout');
  });

  it('calls logout when the logout button is clicked', async () => {
    const mockLogout = vi.fn().mockResolvedValue(undefined);
    useLogout.mockReturnValue(mockLogout);
    useTranslate.mockReturnValue(vi.fn(useTranslateMock));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UnauthorizedPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const logoutButton = screen.getByRole('button');
    logoutButton.click();

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
