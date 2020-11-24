import { gql } from '@apollo/client';

export const addEventGroupMutation = gql`
  mutation addEventGroup($input: AddEventGroupMutationInput!) {
    addEventGroup(input: $input) {
      eventGroup {
        id
      }
    }
  }
`;
