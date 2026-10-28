import { gql } from '@apollo/client';

export const themePathsQuery = gql`
  query ThemePaths {
    themePaths {
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
