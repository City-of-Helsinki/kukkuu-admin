import { gql } from '@apollo/client';

export const organisationsQuery = gql`
  query Organisations {
    organisations {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
