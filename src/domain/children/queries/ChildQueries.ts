import { gql } from '@apollo/client';

export const childrenQuery = gql`
  query Children($projectId: ID, $limit: Int, $offset: Int) {
    children(projectId: $projectId, limit: $limit, offset: $offset) {
      count
      edges {
        node {
          id
          firstName
          lastName
          birthdate
          postalCode
          guardians {
            edges {
              node {
                id
                email
                firstName
                lastName
                language
              }
            }
          }
        }
      }
    }
  }
`;

export const childQuery = gql`
  query Child($id: ID!) {
    child(id: $id) {
      id
      firstName
      lastName
      birthdate
      postalCode
      guardians {
        edges {
          node {
            id
            email
            language
            firstName
            lastName
            phoneNumber
          }
        }
      }
      occurrences {
        edges {
          node {
            id
            time
            event {
              id
              duration
            }
            venue {
              id
            }
          }
        }
      }
    }
  }
`;
