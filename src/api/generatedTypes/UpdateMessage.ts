/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateMessageMutationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMessage
// ====================================================

export interface UpdateMessage_updateMessage_message {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdateMessage_updateMessage {
  message: UpdateMessage_updateMessage_message | null;
}

export interface UpdateMessage {
  updateMessage: UpdateMessage_updateMessage | null;
}

export interface UpdateMessageVariables {
  input: UpdateMessageMutationInput;
}
