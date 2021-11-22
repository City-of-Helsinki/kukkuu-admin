/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum, MessageTranslationLanguageCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: Message
// ====================================================

export interface Message_message_event {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface Message_message_translations {
  languageCode: MessageTranslationLanguageCode;
  subject: string;
  bodyText: string;
}

export interface Message_message_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  time: any;
}

export interface Message_message_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: Message_message_occurrences_edges_node | null;
}

export interface Message_message_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Message_message_occurrences_edges | null)[];
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
  translations: Message_message_translations[];
  occurrences: Message_message_occurrences;
}

export interface Message {
  message: Message_message | null;
}

export interface MessageVariables {
  id: string;
}
