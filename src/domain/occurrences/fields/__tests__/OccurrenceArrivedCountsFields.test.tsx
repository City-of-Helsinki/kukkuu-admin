import type { ReactElement } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  DataProviderContext,
  I18nContextProvider,
  RecordContext,
  defaultI18nProvider,
} from 'react-admin';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  OccurrenceArrivedChildrenField,
  OccurrenceArrivedGuardiansField,
} from '../OccurrenceArrivedCountsFields';

const mockDataProvider = {
  setEnrolmentAttendance: vi.fn(),
};

type TestEnrolmentRecord = {
  node: {
    id: string;
    attended: boolean | null;
    arrivedChildrenCount: number | null;
    arrivedGuardiansCount: number | null;
    bookedChildrenCount: number;
    bookedGuardiansCount: number;
  };
  cursor: string;
};

describe('OccurrenceArrivedCountsFields', () => {
  const enrolmentRecord: TestEnrolmentRecord = {
    node: {
      id: 'enr-1',
      attended: null,
      arrivedChildrenCount: null,
      arrivedGuardiansCount: null,
      bookedChildrenCount: 3,
      bookedGuardiansCount: 2,
    },
    cursor: '1',
  };

  const renderWithRecord = (
    ui: ReactElement,
    record: TestEnrolmentRecord = enrolmentRecord
  ) => {
    const queryClient = new QueryClient();
    return render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <I18nContextProvider value={defaultI18nProvider}>
            <DataProviderContext.Provider value={mockDataProvider as any}>
              <RecordContext.Provider value={record}>
                {ui}
              </RecordContext.Provider>
            </DataProviderContext.Provider>
          </I18nContextProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockDataProvider.setEnrolmentAttendance.mockResolvedValue({ data: {} });
  });

  it('defaults the paired adult count to bookedGuardiansCount when editing children', async () => {
    renderWithRecord(<OccurrenceArrivedChildrenField />);
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    fireEvent.click(await screen.findByRole('option', { name: '2' }));

    await waitFor(() => {
      expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledWith(
        'enr-1',
        undefined,
        { arrivedChildrenCount: 2, arrivedGuardiansCount: 2 }
      );
    });
  });

  it('preserves existing arrivedChildrenCount when editing arrived adults', async () => {
    renderWithRecord(<OccurrenceArrivedGuardiansField />, {
      ...enrolmentRecord,
      node: {
        ...enrolmentRecord.node,
        attended: true,
        arrivedChildrenCount: 1,
        arrivedGuardiansCount: 2,
      },
    });
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    fireEvent.click(await screen.findByRole('option', { name: '1' }));

    await waitFor(() => {
      expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledWith(
        'enr-1',
        undefined,
        { arrivedChildrenCount: 1, arrivedGuardiansCount: 1 }
      );
    });
  });

  it.each([
    [
      'children',
      OccurrenceArrivedChildrenField,
      { arrivedChildrenCount: 1, arrivedGuardiansCount: 0 },
    ],
    [
      'guardians',
      OccurrenceArrivedGuardiansField,
      { arrivedChildrenCount: 0, arrivedGuardiansCount: 1 },
    ],
  ])(
    'defaults the paired count to 0 when attended is false (%s)',
    async (_name, Field, expectedPayload) => {
      renderWithRecord(<Field />, {
        ...enrolmentRecord,
        node: { ...enrolmentRecord.node, attended: false },
      });
      fireEvent.mouseDown(screen.getByRole('combobox'));
      fireEvent.click(await screen.findByRole('option', { name: '1' }));

      await waitFor(() => {
        expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledWith(
          'enr-1',
          undefined,
          expectedPayload
        );
      });
    }
  );

  it('re-enables the select after a failed save', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    mockDataProvider.setEnrolmentAttendance.mockRejectedValue(new Error('x'));
    renderWithRecord(<OccurrenceArrivedChildrenField />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(await screen.findByRole('option', { name: '1' }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByRole('combobox')).not.toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
    consoleSpy.mockRestore();
  });

  it('serializes sibling edits for the same enrolment and preserves both counts before refresh completes', async () => {
    let resolveFirstSave: (value: unknown) => void;
    const firstSavePromise = new Promise((resolve) => {
      resolveFirstSave = resolve;
    });

    mockDataProvider.setEnrolmentAttendance
      .mockReturnValueOnce(firstSavePromise)
      .mockResolvedValueOnce({ data: {} });

    renderWithRecord(
      <>
        <OccurrenceArrivedChildrenField />
        <OccurrenceArrivedGuardiansField />
      </>
    );

    const [childrenSelect, guardiansSelect] = screen.getAllByRole('combobox');

    fireEvent.mouseDown(childrenSelect);
    fireEvent.click(await screen.findByRole('option', { name: '2' }));

    await waitFor(() => {
      expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledTimes(1);
    });
    expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenNthCalledWith(
      1,
      'enr-1',
      undefined,
      { arrivedChildrenCount: 2, arrivedGuardiansCount: 2 }
    );

    // Edit guardians while first save is still in flight (and before refresh updates RecordContext)
    fireEvent.mouseDown(guardiansSelect);
    fireEvent.click(await screen.findByRole('option', { name: '1' }));

    // Second save must wait for the first save to finish
    expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledTimes(1);

    resolveFirstSave!({ data: {} });

    await waitFor(() => {
      expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenCalledTimes(2);
    });
    expect(mockDataProvider.setEnrolmentAttendance).toHaveBeenNthCalledWith(
      2,
      'enr-1',
      undefined,
      { arrivedChildrenCount: 2, arrivedGuardiansCount: 1 }
    );
  });
});
