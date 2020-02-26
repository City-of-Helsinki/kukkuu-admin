import { gql } from 'apollo-boost';

export const eventsQuery = gql`
  query Events {
    events {
      edges {
        node {
          id
          image
          participantsPerInvite
          duration
          translations {
            languageCode
            name
          }
          capacityPerOccurrence
          publishedAt
          occurrences {
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

export const eventQuery = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      image
      participantsPerInvite
      duration
      translations {
        languageCode
        name
      }
      capacityPerOccurrence
      publishedAt
      occurrences {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
