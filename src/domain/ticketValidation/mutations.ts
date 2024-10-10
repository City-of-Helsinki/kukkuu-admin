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
        occurrenceArrivalStatus {
          enrolmentCount
          attendedEnrolmentCount
        }
      }
    }
  }
`;
