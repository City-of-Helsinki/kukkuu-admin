import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecordContext } from 'react-admin';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import OccurrenceTimeRangeField from '../OccurrenceTimeRangeField';

vi.mock('react-admin', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

vi.mock(
  '../../../../common/translation/I18nProvider',
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      getLocale: () => 'fi',
    };
  }
);

// Mock data provider
const mockDataProvider = {
  setEnrolmentAttendance: vi.fn(),
};

// Mock I18nProvider
const mockI18nProvider = {
  getLocale: () => 'fi',
};

describe('OccurrenceTimeRangeField', () => {
  const occurrence = {
    id: '1',
    time: '2023-10-27T06:00:00Z',
    event: {
      name: 'Event 1',
      duration: 3 * 60,
      eventGroup: null,
    },
  };
  const occurrenceWithoutDuration = {
    id: '2',
    time: '2023-10-28T07:00:00Z',
    event: {
      nameme: 'Event 2',
      duration: null,
      eventGroup: null,
    },
  };

  // eslint-disable-next-line react/prop-types
  const ProviderWrapper = ({ children }) => {
    return <MemoryRouter>{children}</MemoryRouter>;
  };

  it('displays the duration when it exists', () => {
    render(
      <RecordContext.Provider value={occurrence}>
        <OccurrenceTimeRangeField />
      </RecordContext.Provider>,
      { wrapper: ProviderWrapper }
    );
    expect(screen.getByText('09.00 - 12.00')).toBeInTheDocument();
  });

  it('displays the startTime when duration does not exist', () => {
    render(
      <RecordContext.Provider value={occurrenceWithoutDuration}>
        <OccurrenceTimeRangeField />
      </RecordContext.Provider>
    ),
      { wrapper: ProviderWrapper };
    expect(screen.getByText('10.00 -')).toBeInTheDocument();
  });

  it('renders null when record is not provided', () => {
    const { container } = render(
      <RecordContext.Provider value={null}>
        <OccurrenceTimeRangeField />
      </RecordContext.Provider>,
      { wrapper: ProviderWrapper }
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays correct duration when using occurrenceSource', () => {
    const recordWithOccurrence = {
      otherData: 'some data',
      occurrence: occurrence,
    };
    render(
      <RecordContext.Provider value={recordWithOccurrence}>
        <OccurrenceTimeRangeField occurrenceSource="occurrence" />
      </RecordContext.Provider>,
      { wrapper: ProviderWrapper }
    );
    expect(screen.getByText('09.00 - 12.00')).toBeInTheDocument();
  });
});
