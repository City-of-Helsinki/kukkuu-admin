import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  DataProviderContext,
  RecordContext,
  TranslatableContext,
} from 'react-admin';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from 'react-query';

import OccurrenceAttendedField from '../OccurrenceAttendedField';

vi.mock('react-admin', async () => {
  const actual = await import('react-admin');
  return {
    ...actual,
    TranslatableContext: {
      Provider: actual.TranslatableContext.Provider,
      Consumer: actual.TranslatableContext.Consumer,
    },
  };
});

// Mock data provider
const mockDataProvider = {
  setEnrolmentAttendance: vi.fn(),
};

// Mock translate function
const mockTranslate = (key) => key;

describe('OccurrenceAttendedField', () => {
  const enrolment = {
    node: {
      id: '1',
      attended: null,
    },
    cursor: '1',
  };
  const attendedEnrolment = {
    node: {
      id: '2',
      attended: true,
    },
    cursor: '2',
  };
  const notAttendedEnrolment = {
    node: {
      id: '3',
      attended: false,
    },
    cursor: '3',
  };

  // eslint-disable-next-line react/prop-types
  const ProviderWrapper = ({ children }) => {
    const queryClient = new QueryClient();
    return (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <TranslatableContext.Provider value={{ translate: mockTranslate }}>
            <DataProviderContext.Provider value={mockDataProvider}>
              <RecordContext.Provider value={enrolment}>
                {children}
              </RecordContext.Provider>
            </DataProviderContext.Provider>
          </TranslatableContext.Provider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the correct default value', () => {
    render(<OccurrenceAttendedField />, { wrapper: ProviderWrapper });
    expect(
      screen.getByText(
        'occurrences.fields.enrolments.fields.attended.choices.null'
      )
    ).toBeInTheDocument();
  });

  it.each([
    {
      translationKey:
        'occurrences.fields.enrolments.fields.attended.choices.true',
      value: true,
    },
    {
      translationKey:
        'occurrences.fields.enrolments.fields.attended.choices.false',
      value: false,
    },
  ])(
    'calls dataProvider.setEnrolmentAttendance when the selection changes to $value',
    async ({ translationKey, value }) => {
      mockDataProvider.setEnrolmentAttendance.mockResolvedValue(
        'setEnrolmentAttendance'
      );
      const { container } = render(<OccurrenceAttendedField />, {
        wrapper: ProviderWrapper,
      });
      const menuTrigger = screen.getByText(
        'occurrences.fields.enrolments.fields.attended.choices.null'
      );
      fireEvent.mouseDown(menuTrigger);
      const menuItem = await screen.findByText(translationKey);
      fireEvent.click(menuItem);
      await waitFor(() => {
        expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledWith(
          '1',
          value
        );
      });
    }
  );

  it.each([
    {
      record: attendedEnrolment,
      textContent: 'occurrences.fields.enrolments.fields.attended.choices.true',
      value: true,
    },
    {
      record: notAttendedEnrolment,
      textContent:
        'occurrences.fields.enrolments.fields.attended.choices.false',
      value: false,
    },
  ])(
    'displays the correct value when attended is $value',
    ({ record, textContent }) => {
      const queryClient = new QueryClient();
      render(
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <TranslatableContext.Provider value={{ translate: mockTranslate }}>
              <DataProviderContext.Provider value={mockDataProvider}>
                <RecordContext.Provider value={record}>
                  <OccurrenceAttendedField />
                </RecordContext.Provider>
              </DataProviderContext.Provider>
            </TranslatableContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      );
      expect(screen.getByText(textContent)).toBeInTheDocument();
    }
  );
});
