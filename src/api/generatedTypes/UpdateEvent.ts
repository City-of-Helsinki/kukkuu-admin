/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateEventMutationInput, EventParticipantsPerInvite, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEvent_event_translations {
  languageCode: Language;
  name: string;
  description: string;
  shortDescription: string;
}

export interface UpdateEvent_updateEvent_event {
  /**
   * The ID of the object.
   */
  id: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  /**
   * In minutes
   */
  duration: number | null;
  translations: UpdateEvent_updateEvent_event_translations[];
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
