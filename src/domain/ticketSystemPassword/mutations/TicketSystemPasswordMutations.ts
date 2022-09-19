import { gql } from '@apollo/client';

export const importEventTicketSystemPasswordsMutation = gql`
  mutation ImportTicketSystemPasswordsMutation(
    $input: ImportTicketSystemPasswordsMutationInput!
  ) {
    importTicketSystemPasswords(input: $input) {
      event {
        id
        name
      }
      passwords
      errors {
        field
        message
        value
      }
    }
  }
`;
