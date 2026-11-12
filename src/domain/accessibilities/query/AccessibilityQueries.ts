import { gql } from '@apollo/client';

export const accessibilitiesQuery = gql`
  query Accessibilities {
    accessibilities {
      edges {
        node {
          id
          slug
          name
        }
      }
    }
  }
`;
