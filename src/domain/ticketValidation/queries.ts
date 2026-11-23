import { gql } from '@apollo/client';

export const verifyTicketQuery = gql`
  query VerifyTicket($referenceId: String!) {
    verifyTicket(referenceId: $referenceId) {
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
`;
