import { gql } from '@apollo/client';

export const verifyTicketQuery = gql`
  query VerifyTicket($referenceId: String!) {
    verifyTicket(referenceId: $referenceId) {
      occurrenceTime
      eventName
      venueName
      validity
      attended
      occurrenceArrivalStatus {
        enrolmentCount
        attendedEnrolmentCount
      }
    }
  }
`;
