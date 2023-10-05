/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteMessageMutationInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: DeleteMessage
// ====================================================

export interface DeleteMessage_deleteMessage {
  clientMutationId: string | null;
}

export interface DeleteMessage {
  deleteMessage: DeleteMessage_deleteMessage | null;
}

export interface DeleteMessageVariables {
  input: DeleteMessageMutationInput;
}
