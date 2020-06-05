import gql from 'graphql-tag';

export const addOccurrenceMutation = gql`
  mutation addOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
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

export const updateOccurrenceMutation = gql`
  mutation updateOccurrence($input: UpdateOccurrenceMutationInput!) {
    updateOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
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

export const deleteOccurrenceMutation = gql`
  mutation deleteOccurrence($input: DeleteOccurrenceMutationInput!) {
    deleteOccurrence(input: $input) {
      clientMutationId
    }
  }
`;
