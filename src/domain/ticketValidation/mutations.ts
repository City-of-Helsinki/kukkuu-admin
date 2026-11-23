import { gql } from '@apollo/client';

export const updateTicketAttendedMutation = gql`
  mutation UpdateTicketAttended($input: UpdateTicketAttendedMutationInput!) {
    updateTicketAttended(input: $input) {
      ticket {
        occurrenceTime
        eventName
        venueName
        validity
        attended
        bookedChildrenCount
        bookedGuardiansCount
        arrivedChildrenCount
        arrivedGuardiansCount
        occurrenceArrivalStatus {
          enrolmentCount
          attendedEnrolmentCount
          handledEnrolmentCount
          attendedSeats
          reservedSeats
          capacity
          pendingArrivalSeats
          remainingEmptySeats
        }
      }
    }
  }
`;
