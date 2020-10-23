/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendMessageMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SendMessage
// ====================================================

export interface SendMessage_sendMessage_message {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SendMessage_sendMessage {
  message: SendMessage_sendMessage_message | null;
}

export interface SendMessage {
  sendMessage: SendMessage_sendMessage | null;
}

export interface SendMessageVariables {
  input: SendMessageMutationInput;
}
