import { gql } from '@apollo/client';

export const occurrencesQuery = gql`
  query Occurrences($projectId: String, $eventId: String) {
    occurrences(projectId: $projectId, eventId: $eventId) {
      edges {
        node {
          id
          time
          event {
            duration
            capacityPerOccurrence
          }
          enrolmentCount
          capacity
          capacityOverride
          venue {
            id
            translations {
              languageCode
              name
            }
          }
          attendedEnrolmentCount
          freeSpotNotificationSubscriptionCount
          enrolments {
            edges {
              node {
                id
                attended
              }
            }
          }
          freeSpotNotificationSubscriptions {
            edges {
              node {
                id
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
        name
        capacityPerOccurrence
        duration
        publishedAt
        eventGroup {
          id
          name
        }
      }
      enrolmentCount
      capacity
      capacityOverride
      venue {
        id
        translations {
          languageCode
          name
        }
      }
      enrolments {
        edges {
          node {
            id
            attended
            child {
              id
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
                    phoneNumber
                  }
                }
              }
            }
          }
        }
      }
      freeSpotNotificationSubscriptions {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
