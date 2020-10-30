/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum, LanguageTranslationLanguageCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: MessageFragment
// ====================================================

export interface MessageFragment_event {
  /**
   * The ID of the object.
   */
  id: string;
  name: string | null;
}

export interface MessageFragment_translations {
  languageCode: LanguageTranslationLanguageCode;
  subject: string;
  bodyText: string;
}

export interface MessageFragment_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface MessageFragment_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: MessageFragment_occurrences_edges_node | null;
}

export interface MessageFragment_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (MessageFragment_occurrences_edges | null)[];
}

export interface MessageFragment {
  /**
   * The ID of the object.
   */
  id: string;
  subject: string | null;
  bodyText: string | null;
  recipientSelection: RecipientSelectionEnum | null;
  recipientCount: number | null;
  sentAt: any | null;
  event: MessageFragment_event | null;
  translations: MessageFragment_translations[];
  occurrences: MessageFragment_occurrences;
}
