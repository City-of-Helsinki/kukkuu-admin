import gql from 'graphql-tag';

export const eventsQuery = gql`
  query Events($projectId: ID) {
    events(projectId: $projectId) {
      edges {
        node {
          id
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
