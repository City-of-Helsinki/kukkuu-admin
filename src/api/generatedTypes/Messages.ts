/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipientSelectionEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: Messages
// ====================================================

export interface Messages_messages_edges_node_event {
  name: string | null;
}

export interface Messages_messages_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
  subject: string | null;
  bodyText: string | null;
  recipientSelection: RecipientSelectionEnum | null;
  recipientCount: number | null;
  sentAt: any | null;
  event: Messages_messages_edges_node_event | null;
}

export interface Messages_messages_edges {
  /**
   * The item at the end of the edge
   */
  node: Messages_messages_edges_node | null;
}

export interface Messages_messages {
  /**
   * Contains the nodes in this connection.
   */
  edges: (Messages_messages_edges | null)[];
}

export interface Messages {
  messages: Messages_messages | null;
}

export interface MessagesVariables {
  projectId?: string | null;
}
