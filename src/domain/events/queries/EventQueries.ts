import { gql } from '@apollo/client';

export const eventsQuery = gql`
  query Events($projectId: ID) {
    events(projectId: $projectId) {
      edges {
        node {
          id
          name
          image
          participantsPerInvite
          duration
          translations {
            languageCode
            name
            imageAltText
            description
            shortDescription
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
      name
      image
      participantsPerInvite
      duration
      translations {
        languageCode
        name
        imageAltText
        description
        shortDescription
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
