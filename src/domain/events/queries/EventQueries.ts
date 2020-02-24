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
