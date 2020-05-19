import { gql } from 'apollo-boost';

export const myAdminProfileQuery = gql`
  query MyAdminProfile {
    myAdminProfile {
      id
      projects {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;
