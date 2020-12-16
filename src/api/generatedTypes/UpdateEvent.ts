/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventMutationInput, EventParticipantsPerInvite, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEvent_event_translations {
  imageAltText: string;
  languageCode: Language;
  name: string;
  description: string;
  shortDescription: string;
}

export interface UpdateEvent_updateEvent_event_occurrences_edges_node {
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdateEvent_updateEvent_event_occurrences_edges {
  /**
   * The item at the end of the edge
   */
  node: UpdateEvent_updateEvent_event_occurrences_edges_node | null;
}

export interface UpdateEvent_updateEvent_event_occurrences {
  /**
   * Contains the nodes in this connection.
   */
  edges: (UpdateEvent_updateEvent_event_occurrences_edges | null)[];
}

export interface UpdateEvent_updateEvent_event {
  /**
   * The ID of the object.
   */
  id: string;
  image: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  /**
   * In minutes
   */
  duration: number | null;
  readyForEventGroupPublishing: boolean;
  translations: UpdateEvent_updateEvent_event_translations[];
  occurrences: UpdateEvent_updateEvent_event_occurrences;
}

export interface UpdateEvent_updateEvent {
  event: UpdateEvent_updateEvent_event | null;
}

export interface UpdateEvent {
  updateEvent: UpdateEvent_updateEvent | null;
}

export interface UpdateEventVariables {
  input: UpdateEventMutationInput;
}
