import gql from 'graphql-tag';

export const projectQuery = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      year
      translations {
        languageCode
        name
      }
    }
  }
`;
