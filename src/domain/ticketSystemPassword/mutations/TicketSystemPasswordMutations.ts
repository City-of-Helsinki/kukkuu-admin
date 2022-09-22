import { gql } from '@apollo/client';

export const importEventTicketSystemPasswordsMutation = gql`
  mutation ImportTicketSystemPasswordsMutation(
    $input: ImportTicketSystemPasswordsMutationInput!
  ) {
    importTicketSystemPasswords(input: $input) {
      errors {
        field
        message
        value
      }
    }
  }
`;
