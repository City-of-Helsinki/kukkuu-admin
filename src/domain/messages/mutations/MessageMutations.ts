import { gql } from '@apollo/client';

export const addMessageMutation = gql`
  mutation AddMessage($input: AddMessageMutationInput!) {
    addMessage(input: $input) {
      message {
        id
      }
    }
  }
`;

export const updateMessageMutation = gql`
  mutation UpdateMessage($input: UpdateMessageMutationInput!) {
    updateMessage(input: $input) {
      message {
        id
      }
    }
  }
`;

export const deleteMessageMutation = gql`
  mutation DeleteMessage($input: DeleteMessageMutationInput!) {
    deleteMessage(input: $input) {
      clientMutationId
    }
  }
`;

export const sendMessageMutation = gql`
  mutation SendMessage($input: SendMessageMutationInput!) {
    sendMessage(input: $input) {
      message {
        id
      }
    }
  }
`;
