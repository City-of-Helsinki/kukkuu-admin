import { gql } from 'apollo-boost';

export const childrenQuery = gql`
  query Children {
    children {
      edges {
        node {
          id
          firstName
          lastName
          birthdate
          guardians {
            edges {
              node {
                id
                email
                language
              }
            }
          }
        }
      }
    }
  }
`;
