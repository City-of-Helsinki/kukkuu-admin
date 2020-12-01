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

export const updateEventGroupMutation = gql`
  mutation updateEventGroup($input: UpdateEventGroupMutationInput!) {
    updateEventGroup(input: $input) {
      eventGroup {
        id
      }
    }
  }
`;

export const deleteEventGroupMutation = gql`
  mutation deleteEventGroup($input: DeleteEventGroupMutationInput!) {
    deleteEventGroup(input: $input) {
      clientMutationId
    }
  }
`;

export const publishEventGroupMutation = gql`
  mutation publishEventGroup($input: PublishEventGroupMutationInput!) {
    publishEventGroup(input: $input) {
      eventGroup {
        id
        publishedAt
      }
    }
  }
`;
