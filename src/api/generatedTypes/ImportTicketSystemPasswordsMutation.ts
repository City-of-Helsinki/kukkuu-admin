/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImportTicketSystemPasswordsMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ImportTicketSystemPasswordsMutation
// ====================================================

export interface ImportTicketSystemPasswordsMutation_importTicketSystemPasswords_event {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface ImportTicketSystemPasswordsMutation_importTicketSystemPasswords_errors {
  field: string;
  message: string;
  value: string;
}

export interface ImportTicketSystemPasswordsMutation_importTicketSystemPasswords {
  event: ImportTicketSystemPasswordsMutation_importTicketSystemPasswords_event | null;
  /**
   * A list of imported passwords
   */
  passwords: (string | null)[] | null;
  /**
   * A list of passwords which could not be imported
   */
  errors: (ImportTicketSystemPasswordsMutation_importTicketSystemPasswords_errors | null)[] | null;
}

export interface ImportTicketSystemPasswordsMutation {
  importTicketSystemPasswords: ImportTicketSystemPasswordsMutation_importTicketSystemPasswords | null;
}

export interface ImportTicketSystemPasswordsMutationVariables {
  input: ImportTicketSystemPasswordsMutationInput;
}
