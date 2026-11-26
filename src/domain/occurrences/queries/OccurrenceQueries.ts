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
            ticketSystem {
              type
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
          accessibilities {
            id
            name
          }
          languages {
            id
            name
          }
          attendedEnrolmentCount
          handledEnrolmentCount
          attendedCountOverride
          attendedChildrenCountOverride
          attendedAdultsCountOverride
          attendedSeats
          calculatedAttendedSeats
          pendingArrivalSeats
          remainingEmptySeats
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
        ticketSystem {
          type
        }
        eventGroup {
          id
          name
        }
      }
      enrolmentCount
      attendedEnrolmentCount
      handledEnrolmentCount
      attendedCountOverride
      attendedChildrenCountOverride
      attendedAdultsCountOverride
      attendedSeats
      calculatedAttendedSeats
      pendingArrivalSeats
      remainingEmptySeats
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
      accessibilities {
        id
        slug
        name
      }
      languages {
        id
        alpha3Code
        name
      }
      enrolments {
        edges {
          node {
            id
            attended
            arrivedChildrenCount
            arrivedGuardiansCount
            bookedChildrenCount
            bookedGuardiansCount
            arrivedSeats
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
