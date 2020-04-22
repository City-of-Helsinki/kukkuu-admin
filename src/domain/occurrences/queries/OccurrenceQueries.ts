import { gql } from 'apollo-boost';

export const occurrencesQuery = gql`
  query Occurrences($eventId: String) {
    occurrences(eventId: $eventId) {
      edges {
        node {
          id
          time
          event {
            id
            capacityPerOccurrence
          }
          enrolmentCount
          venue {
            id
            translations {
              languageCode
              name
            }
          }
        }
      }
    }
  }
`;
