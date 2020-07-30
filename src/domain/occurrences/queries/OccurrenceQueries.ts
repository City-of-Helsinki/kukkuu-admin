import gql from 'graphql-tag';

export const occurrencesQuery = gql`
  query Occurrences($projectId: String, $eventId: String) {
    occurrences(projectId: $projectId, eventId: $eventId) {
      edges {
        node {
          id
          time
          event {
            id
            capacityPerOccurrence
            duration
            publishedAt
          }
          enrolmentCount
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
        publishedAt
      }
      enrolmentCount
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
    }
  }
`;
