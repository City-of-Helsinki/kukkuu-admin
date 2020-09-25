import gql from 'graphql-tag';

const OccurrenceShowPage = {
  fragments: {
    occurrenceFragment: gql`
      fragment OccurrenceFragment on OccurrenceNode {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
          publishedAt
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
        freeSpotNotificationSubscriptions {
          edges {
            node {
              id
            }
          }
        }
      }
    `,
  },
};

export const occurrencesQuery = gql`
  query Occurrences($projectId: String, $eventId: String) {
    occurrences(projectId: $projectId, eventId: $eventId) {
      edges {
        node {
          ...OccurrenceFragment
        }
      }
    }
  }
  ${OccurrenceShowPage.fragments.occurrenceFragment}
`;

export const occurrenceQuery = gql`
  query Occurrence($id: ID!) {
    occurrence(id: $id) {
      ...OccurrenceFragment
    }
  }
  ${OccurrenceShowPage.fragments.occurrenceFragment}
`;
