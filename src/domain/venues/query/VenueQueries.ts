import gql from 'graphql-tag';

export const venuesQuery = gql`
  query Venues($projectId: ID) {
    venues(projectId: $projectId) {
      edges {
        node {
          id
          translations {
            name
            address
            languageCode
          }
          occurrences {
            pageInfo {
              startCursor
            }
          }
        }
      }
    }
  }
`;

export const venueQuery = gql`
  query Venue($id: ID!) {
    venue(id: $id) {
      id
      translations {
        name
        address
        languageCode
        description
        accessibilityInfo
        arrivalInstructions
        additionalInfo
      }
      occurrences {
        pageInfo {
          startCursor
        }
      }
    }
  }
`;
