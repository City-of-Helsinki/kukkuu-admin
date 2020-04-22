import { gql } from 'apollo-boost';

export const addOccurrenceMutation = gql`
  mutation addOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
        }
        enrolmentCount
        venue {
          id
          translations {
            languageCode
            name
          }
        }
      }
    }
  }
`;
