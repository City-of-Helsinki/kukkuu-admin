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
          children {
            edges {
              node {
                id
                firstName
                lastName
                birthdate
                guardians {
                  edges {
                    node {
                      id
                      email
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const occurrenceQuery = gql`
  query Occurrence($id: ID!) {
    occurrence(id: $id) {
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
      children {
        edges {
          node {
            id
            firstName
            lastName
            birthdate
            guardians {
              edges {
                node {
                  id
                  email
                }
              }
            }
          }
        }
      }
    }
  }
`;
