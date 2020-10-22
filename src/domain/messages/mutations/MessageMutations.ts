import gql from 'graphql-tag';

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
