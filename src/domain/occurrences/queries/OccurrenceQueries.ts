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
          seatCount
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
        project {
          id
        }
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
      seatCount
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
            totalSeats
            child {
              id
              name
              birthyear
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
