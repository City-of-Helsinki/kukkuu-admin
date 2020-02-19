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
