import { gql } from 'apollo-boost';

export const venuesQuery = gql`
  query Venues {
    venues {
      edges {
        node {
          id
          translations {
            name
            address
            languageCode
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
    }
  }
`;
