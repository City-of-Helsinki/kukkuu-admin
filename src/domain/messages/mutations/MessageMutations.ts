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
