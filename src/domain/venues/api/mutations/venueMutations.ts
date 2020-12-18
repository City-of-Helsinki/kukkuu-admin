import { gql } from '@apollo/client';

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
          wcAndFacilities
        }
      }
    }
  }
`;

export const updateVenueMutation = gql`
  mutation updateVenue($input: UpdateVenueMutationInput!) {
    updateVenue(input: $input) {
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
          wcAndFacilities
        }
      }
    }
  }
`;

export const deleteVenueMutation = gql`
  mutation deleteVenue($input: DeleteVenueMutationInput!) {
    deleteVenue(input: $input) {
      clientMutationId
    }
  }
`;
