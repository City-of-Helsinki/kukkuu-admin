import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'react-admin';
import { vi } from 'vitest';

vi.mock('../useVerifyTicketQuery', async () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});
import mockedUseVerifyTicketQuery from '../useVerifyTicketQuery';
import TicketValidationPage from '../TicketValidationPage';

const mockUseVerifyTicketQueryResponse = {
  data: {
    verifyTicket: {
      validity: true,
      eventName: 'Sample Event',
      venueName: 'Sample Venue',
      occurrenceTime: '2025-02-26T10:00:00Z',
      attended: false,
      occurrenceArrivalStatus: {
        enrolmentCount: 100,
        attendedEnrolmentCount: 50,
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
        'ticketValidation.updateTicketAttended.switchButton.label'
      )
    ).not.toBeInTheDocument();
  });

  it('should display a success message when validation succeeds', () => {
    mockedUseVerifyTicketQuery.mockReturnValue({
      ...mockUseVerifyTicketQueryResponse,
      data: {
        ...mockUseVerifyTicketQueryResponse.data,
        verifyTicket: {
          ...mockUseVerifyTicketQueryResponse.data.verifyTicket,
          validity: true,
        },
      },
    });
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

  describe('form control', () => {
    it("should display the 'Update Ticket Attended' switch button when the ticket is valid", () => {
      mockedUseVerifyTicketQuery.mockReturnValue({
        ...mockUseVerifyTicketQueryResponse,
        data: {
          ...mockUseVerifyTicketQueryResponse.data,
          verifyTicket: {
            ...mockUseVerifyTicketQueryResponse.data.verifyTicket,
            validity: true,
          },
        },
      });
      render(<TicketValidationPage />, { wrapper: ThemeProvider });
      expect(
        screen.getByText(
          'ticketValidation.updateTicketAttended.switchButton.label'
        )
      ).toBeInTheDocument();
    });
  });

  describe('arrival status', () => {
    it('should display the arrival status', () => {
      mockedUseVerifyTicketQuery.mockReturnValue(
        mockUseVerifyTicketQueryResponse
      );
      render(<TicketValidationPage />, { wrapper: ThemeProvider });
      expect(
        screen.getByText('ticketValidation.arrivalStatus.label')
      ).toBeInTheDocument();
    });
  });
});
