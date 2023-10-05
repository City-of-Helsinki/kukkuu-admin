/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMessageMutationInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: AddMessage
// ====================================================

export interface AddMessage_addMessage_message {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AddMessage_addMessage {
  message: AddMessage_addMessage_message | null;
}

export interface AddMessage {
  addMessage: AddMessage_addMessage | null;
}

export interface AddMessageVariables {
  input: AddMessageMutationInput;
}
