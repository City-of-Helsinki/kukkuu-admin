import { gql } from '@apollo/client';

export const languagesQuery = gql`
  query Languages($canBeOccurrenceLanguage: Boolean) {
    languages(canBeOccurrenceLanguage: $canBeOccurrenceLanguage) {
      edges {
        node {
          id
          alpha3Code
          name
        }
      }
    }
  }
`;
