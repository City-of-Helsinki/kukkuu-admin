import { gql } from '@apollo/client';

export const childrenQuery = gql`
  query Children($projectId: ID, $limit: Int, $offset: Int) {
    children(projectId: $projectId, limit: $limit, offset: $offset) {
      count
      edges {
        node {
          id
          name
          birthyear
          postalCode
          guardians {
            edges {
              node {
                ...ChildGuardianFragment
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
      name
      birthyear
      postalCode
      guardians {
        edges {
          node {
            ...ChildGuardianFragment
          }
        }
      }
      occurrences {
        edges {
          node {
            ...ChildOccurrenceFragment
          }
        }
      }
    }
  }

  fragment ChildGuardianFragment on GuardianNode {
    id
    email
    language
    firstName
    lastName
    phoneNumber
  }

  fragment ChildOccurrenceFragment on OccurrenceNode {
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
`;
