import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'react-admin';
import { vi } from 'vitest';

vi.mock('../useVerifyTicketQuery', async () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockUpdateAttended = vi.fn();
let latestMutationConfig;
vi.mock('../useUpdateTicketAttendedMutation', async () => ({
  __esModule: true,
  default: (config) => {
    latestMutationConfig = config;
    return [mockUpdateAttended, { loading: false }];
  },
}));

import mockedUseVerifyTicketQuery from '../useVerifyTicketQuery';
import TicketValidationPage from '../TicketValidationPage';

const mockUseVerifyTicketQueryResponse = {
  data: {
    verifyTicket: {
      validity: true,
      eventName: 'Sample Event',
      venueName: 'Sample Venue',
      occurrenceTime: '2025-02-26T10:00:00Z',
      attended: null,
      bookedChildrenCount: 3,
      bookedGuardiansCount: 2,
      arrivedChildrenCount: null,
      arrivedGuardiansCount: null,
      occurrenceArrivalStatus: {
        enrolmentCount: 10,
        attendedEnrolmentCount: 4,
        handledEnrolmentCount: 5,
        attendedSeats: 12,
        reservedSeats: 25,
        capacity: 30,
        pendingArrivalSeats: 11,
        remainingEmptySeats: 18,
      },
    },
  },
  error: null,
  loading: false,
  refetch: vi.fn(),
};

describe('TicketValidationPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the venue and event names', () => {
    mockedUseVerifyTicketQuery.mockReturnValue(
      mockUseVerifyTicketQueryResponse
    );
    render(<TicketValidationPage />, { wrapper: ThemeProvider });
    expect(
      screen.getByText(
        mockUseVerifyTicketQueryResponse.data.verifyTicket.venueName
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        mockUseVerifyTicketQueryResponse.data.verifyTicket.eventName
      )
    ).toBeInTheDocument();
  });

  it('should display an invalid ticket message when validation fails', () => {
    mockedUseVerifyTicketQuery.mockReturnValue({
      ...mockUseVerifyTicketQueryResponse,
      data: {
        ...mockUseVerifyTicketQueryResponse.data,
        verifyTicket: {
          ...mockUseVerifyTicketQueryResponse.data.verifyTicket,
          validity: false,
        },
      },
    });
    render(<TicketValidationPage />, { wrapper: ThemeProvider });
    expect(screen.getByText('ticketValidation.invalid')).toBeInTheDocument();
    expect(
      screen.queryByText(
        'ticketValidation.updateTicketAttended.saveButton.label'
      )
    ).not.toBeInTheDocument();
  });

  it('should display a success message when validation succeeds', () => {
    mockedUseVerifyTicketQuery.mockReturnValue(
      mockUseVerifyTicketQueryResponse
    );
    render(<TicketValidationPage />, { wrapper: ThemeProvider });
    expect(screen.getByText('ticketValidation.valid')).toBeInTheDocument();
  });

  it('should display an error message when error occurs', () => {
    mockedUseVerifyTicketQuery.mockReturnValue({
      ...mockUseVerifyTicketQueryResponse,
      data: null,
      error: { message: 'Error' },
    });
    render(<TicketValidationPage />, { wrapper: ThemeProvider });
    expect(screen.getByText('ticketValidation.error')).toBeInTheDocument();
  });

  describe('participant steppers and save', () => {
    it('prefills steppers with booked counts and submits adjusted counts', () => {
      mockedUseVerifyTicketQuery.mockReturnValue(
        mockUseVerifyTicketQueryResponse
      );
      render(<TicketValidationPage />, { wrapper: ThemeProvider });

      expect(
        screen.getByTestId(
          'stepper-value-ticketValidation.arrivedChildren.label'
        )
      ).toHaveTextContent('3');
      expect(
        screen.getByTestId('stepper-value-ticketValidation.arrivedAdults.label')
      ).toHaveTextContent('2');

      fireEvent.click(
        screen.getByLabelText('ticketValidation.arrivedChildren.decrement')
      );
      expect(
        screen.getByTestId(
          'stepper-value-ticketValidation.arrivedChildren.label'
        )
      ).toHaveTextContent('2');

      fireEvent.click(
        screen.getByText(
          'ticketValidation.updateTicketAttended.saveButton.label'
        )
      );
      expect(mockUpdateAttended).toHaveBeenCalledWith({
        variables: {
          input: {
            referenceId: '',
            arrivedChildrenCount: 2,
            arrivedGuardiansCount: 2,
          },
        },
      });
    });

    it('initializes steppers from saved arrived counts when already recorded', () => {
      mockedUseVerifyTicketQuery.mockReturnValue({
        ...mockUseVerifyTicketQueryResponse,
        data: {
          verifyTicket: {
            ...mockUseVerifyTicketQueryResponse.data.verifyTicket,
            attended: true,
            arrivedChildrenCount: 1,
            arrivedGuardiansCount: 2,
          },
        },
      });
      render(<TicketValidationPage />, { wrapper: ThemeProvider });

      expect(
        screen.getByText('ticketValidation.savedStatus')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(
          'stepper-value-ticketValidation.arrivedChildren.label'
        )
      ).toHaveTextContent('1');
      expect(
        screen.getByTestId('stepper-value-ticketValidation.arrivedAdults.label')
      ).toHaveTextContent('2');
    });

    it('keeps steppers and save disabled while post-save refresh is in flight', async () => {
      let resolveRefetch;
      const refetchPromise = new Promise((resolve) => {
        resolveRefetch = resolve;
      });
      const refetchMock = vi.fn(() => refetchPromise);

      mockedUseVerifyTicketQuery.mockReturnValue({
        ...mockUseVerifyTicketQueryResponse,
        refetch: refetchMock,
      });

      const { rerender } = render(<TicketValidationPage />, {
        wrapper: ThemeProvider,
      });

      const childrenDecrement = screen.getByLabelText(
        'ticketValidation.arrivedChildren.decrement'
      );
      const saveButton = screen.getByText(
        'ticketValidation.updateTicketAttended.saveButton.label'
      );

      expect(childrenDecrement).toBeEnabled();
      expect(saveButton).toBeEnabled();

      act(() => {
        latestMutationConfig.sideEffect();
      });

      expect(refetchMock).toHaveBeenCalledTimes(1);
      expect(childrenDecrement).toBeDisabled();
      expect(saveButton).toBeDisabled();

      mockedUseVerifyTicketQuery.mockReturnValue({
        ...mockUseVerifyTicketQueryResponse,
        refetch: refetchMock,
        data: {
          verifyTicket: {
            ...mockUseVerifyTicketQueryResponse.data.verifyTicket,
            attended: true,
            arrivedChildrenCount: 1,
            arrivedGuardiansCount: 1,
          },
        },
      });

      await act(async () => {
        resolveRefetch();
        await refetchPromise;
      });

      rerender(<TicketValidationPage />);

      await waitFor(() => {
        expect(childrenDecrement).toBeEnabled();
      });
      expect(saveButton).toBeEnabled();
      expect(
        screen.getByTestId(
          'stepper-value-ticketValidation.arrivedChildren.label'
        )
      ).toHaveTextContent('1');
      expect(
        screen.getByTestId('stepper-value-ticketValidation.arrivedAdults.label')
      ).toHaveTextContent('1');
    });
  });

  describe('arrival status', () => {
    it('displays all five explicit doorway metrics', () => {
      mockedUseVerifyTicketQuery.mockReturnValue(
        mockUseVerifyTicketQueryResponse
      );
      render(<TicketValidationPage />, { wrapper: ThemeProvider });
      expect(
        screen.getByText('arrivalMetrics.peopleArrived.label')
      ).toBeInTheDocument();
      expect(
        screen.getByText('arrivalMetrics.seatsReserved.label')
      ).toBeInTheDocument();
      expect(
        screen.getByText('arrivalMetrics.spaceLeft.label')
      ).toBeInTheDocument();
      expect(
        screen.getByText('arrivalMetrics.expectedRemaining.label')
      ).toBeInTheDocument();
      expect(
        screen.getByText('arrivalMetrics.ticketsHandled.label')
      ).toBeInTheDocument();
    });
  });
});
