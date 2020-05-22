import gql from 'graphql-tag';

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
