import { gql } from '@apollo/client';

export const venuesQuery = gql`
  query Venues($projectId: ID) {
    venues(projectId: $projectId) {
      edges {
        node {
          id
          translations {
            languageCode
            name
            description
            address
            accessibilityInfo
            arrivalInstructions
            additionalInfo
            wcAndFacilities
            wwwUrl
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
        languageCode
        name
        description
        address
        accessibilityInfo
        arrivalInstructions
        additionalInfo
        wcAndFacilities
        wwwUrl
      }
      occurrences {
        pageInfo {
          startCursor
        }
      }
    }
  }
`;
