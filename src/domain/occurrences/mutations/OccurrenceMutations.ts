import { gql } from '@apollo/client';

export const addOccurrenceMutation = gql`
  mutation addOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
        }
        enrolmentCount
        venue {
          id
          translations {
            languageCode
            name
          }
        }
        capacity
        capacityOverride
        ticketSystem {
          type
          ... on TicketmasterOccurrenceTicketSystem {
            url
          }
          ... on LippupisteOccurrenceTicketSystem {
            url
          }
        }
      }
    }
  }
`;

export const updateOccurrenceMutation = gql`
  mutation updateOccurrence($input: UpdateOccurrenceMutationInput!) {
    updateOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
        }
        enrolmentCount
        venue {
          id
          translations {
            languageCode
            name
          }
        }
        capacity
        capacityOverride
        enrolments {
          edges {
            node {
              id
              attended
              child {
                firstName
                lastName
                birthdate
                guardians {
                  edges {
                    node {
                      id
                      email
                      firstName
                      lastName
                      language
                    }
                  }
                }
              }
            }
          }
        }
        ticketSystem {
          type
          ... on TicketmasterOccurrenceTicketSystem {
            url
          }
          ... on LippupisteOccurrenceTicketSystem {
            url
          }
        }
      }
    }
  }
`;

export const deleteOccurrenceMutation = gql`
  mutation deleteOccurrence($input: DeleteOccurrenceMutationInput!) {
    deleteOccurrence(input: $input) {
      clientMutationId
    }
  }
`;

export const setEnrolmentAttendanceMutation = gql`
  mutation setEnrolmentAttendance(
    $input: SetEnrolmentAttendanceMutationInput!
  ) {
    setEnrolmentAttendance(input: $input) {
      enrolment {
        id
        attended
      }
    }
  }
`;
