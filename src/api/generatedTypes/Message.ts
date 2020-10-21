/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: Message
// ====================================================

export interface Message_message_event {
  name: string | null;
}

export interface Message_message {
  /**
   * The ID of the object.
   */
  id: string;
  subject: string | null;
  bodyText: string | null;
  recipientSelection: RecipientSelectionEnum | null;
  recipientCount: number | null;
  sentAt: any | null;
  event: Message_message_event | null;
}

export interface Message {
  /**
   * The ID of the object
   */
  message: Message_message | null;
}

export interface MessageVariables {
  id: string;
}
