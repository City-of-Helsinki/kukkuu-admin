import { gql } from 'apollo-boost';

export const addVenueMutation = gql`
  mutation addVenue($input: AddVenueMutationInput!) {
    addVenue(input: $input) {
      venue {
        id
        translations {
          name
          address
          languageCode
          description
          accessibilityInfo
          arrivalInstructions
          additionalInfo
        }
      }
    }
  }
`;
