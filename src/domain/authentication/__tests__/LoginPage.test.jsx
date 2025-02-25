// Mock react-admin hooks
vi.mock('react-admin', async (importOriginal) => ({
  ...(await importOriginal()),
  // eslint-disable-next-line react/prop-types
  Login: ({ children }) => <div data-testid="login-component">{children}</div>,
  useLogin: vi.fn(),
  useTranslate: vi.fn(),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});
vi.mock(import('../../config'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    __esModule: true,
    ...actual,
  };
});
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Login, useLogin, useTranslate } from 'react-admin';
import { StyledEngineProvider } from '@mui/styled-engine';

import LoginPage from '../LoginPage';
import theme from '../../../common/materialUI/themeConfig';
import Config from '../../config';

describe('LoginPage', () => {
  const mockLogin = vi.fn();
  const mockTranslate = vi.fn((key) => {
    switch (key) {
      case 'dashboard.title':
        return 'Kukkuu Admin';
      case 'ra.auth.sign_in':
        return 'Sign in';
      default:
        return key;
    }
  });
  const mockLocation = {
    state: undefined,
    pathname: '/login',
  };
  beforeEach(() => {
    useLogin.mockReturnValue(mockLogin);
    useTranslate.mockReturnValue(mockTranslate);
    useLocation.mockReturnValue(mockLocation);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProvider = (component) => {
    render(
      <MemoryRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <LoginPage />
          </ThemeProvider>
        </StyledEngineProvider>
      </MemoryRouter>
    );
  };

  it('renders the login page with the correct title and button label', () => {
    renderWithProvider();

    expect(screen.getByText('Kukkuu Admin')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls useLogin with the default path when no location state is present', async () => {
    renderWithProvider();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('/');
    });
  });

  it('calls useLogin with the nextPathname when location state is present', async () => {
    useLocation.mockReturnValue({
      state: { nextPathname: '/events' },
      pathname: '/login',
    });

    renderWithProvider();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('/events');
    });
  });

  it('calls useLogin with the root when nextPathname is login', async () => {
    useLocation.mockReturnValue({
      state: { nextPathname: '/login' },
      pathname: '/login',
    });

    renderWithProvider();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('/');
    });
  });

  it('renders the test environment label when IS_TEST_ENVIRONMENT is true', () => {
    vi.spyOn(Config, 'IS_TEST_ENVIRONMENT', 'get').mockReturnValue(true);
    renderWithProvider();
    expect(screen.getByText('application.test')).toBeInTheDocument();
  });

  it('renders button with correct background color when IS_TEST_ENVIRONMENT is true', () => {
    vi.spyOn(Config, 'IS_TEST_ENVIRONMENT', 'get').mockReturnValue(true);
    renderWithProvider();
    const button2 = screen.getByRole('button');
    const style = window.getComputedStyle(button2);
    expect(style.backgroundColor).toEqual('rgb(0, 161, 125)');
  });
});
