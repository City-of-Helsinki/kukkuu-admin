import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {
  useTranslate,
  useGetOne,
  Loading,
  useNotify,
  useLocaleState,
} from 'react-admin';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import * as Sentry from '@sentry/browser';

import Dashboard from '../Dashboard';
import projectService from '../../projects/projectService';

// Mock necessary react-admin hooks
vi.mock('react-admin', async (importOriginal) => ({
  ...(await importOriginal()),
  useTranslate: vi.fn(),
  useGetOne: vi.fn(),
  useNotify: vi.fn(),
  useLocaleState: vi.fn(),
}));

// Mock Sentry
vi.mock('@sentry/browser', async (importActual) => ({
  ...(await importActual()),
  captureException: vi.fn(),
}));

// Mock projectService
vi.mock('../../projects/projectService', async (importOriginal) => ({
  ...(await importOriginal()),
  projectId: 'test-project-id',
}));

const theme = createTheme();

describe('Dashboard', () => {
  const mockTranslate = vi.fn((key) => key);
  const mockNotify = vi.fn();
  const mockLocale = 'fi';
  const mockCaptureException = vi.fn();
  const mockProjectData = {
    id: 'test-project-id',
    translations: { FI: { name: 'name_fi' }, EN: { name: 'name_en' } },
    year: 2023,
  };
  beforeEach(() => {
    vi.clearAllMocks();
    useTranslate.mockReturnValue(mockTranslate);
    useNotify.mockReturnValue(mockNotify);
    useLocaleState.mockReturnValue([mockLocale, vi.fn()]);
    Sentry.captureException.mockImplementation(mockCaptureException);
  });

  it('should render dashboard title', async () => {
    useGetOne.mockReturnValue({
      data: mockProjectData,
      isLoading: false,
    });

    render(
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    );

    await waitFor(() =>
      expect(mockTranslate).toHaveBeenCalledWith('dashboard.title')
    );
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
  });

  it('should render project data when data is loaded', async () => {
    useGetOne.mockReturnValue({
      data: mockProjectData,
      isLoading: false,
    });

    render(
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    );

    await screen.findByText('2023 name_fi');
    expect(screen.getByText('2023 name_fi')).toBeInTheDocument();
  });

  it('should call Sentry and notify on error', async () => {
    const mockError = new Error('Test error');
    useGetOne.mockImplementation((resource, params, { onError }) => {
      onError(mockError);
      return {
        data: undefined,
        isLoading: false,
        error: mockError,
      };
    });

    render(
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(mockCaptureException).toHaveBeenCalledWith(mockError);
    });
    expect(mockNotify).toHaveBeenCalledWith('ra.message.error', {
      type: 'warning',
    });
  });
});
