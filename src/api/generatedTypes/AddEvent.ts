/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventMutationInput, EventParticipantsPerInvite, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddEvent
// ====================================================

export interface AddEvent_addEvent_event_translations {
  languageCode: Language;
  name: string;
  imageAltText: string;
  description: string;
  shortDescription: string;
}

export interface AddEvent_addEvent_event {
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
  translations: AddEvent_addEvent_event_translations[];
}

export interface AddEvent_addEvent {
  event: AddEvent_addEvent_event | null;
}

export interface AddEvent {
  addEvent: AddEvent_addEvent | null;
}

export interface AddEventVariables {
  input: AddEventMutationInput;
}
