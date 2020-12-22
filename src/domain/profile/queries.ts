import { gql } from '@apollo/client';

export const myAdminProfileQuery = gql`
  query MyAdminProfile {
    myAdminProfile {
      id
      projects {
        edges {
          node {
            id
            year
            name
          }
        }
      }
    }
  }
`;
