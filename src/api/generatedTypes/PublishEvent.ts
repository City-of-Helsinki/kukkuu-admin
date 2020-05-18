/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublishEventMutationInput, EventParticipantsPerInvite, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PublishEvent
// ====================================================

export interface PublishEvent_publishEvent_event_translations {
  languageCode: Language;
  name: string;
  description: string;
  shortDescription: string;
}

export interface PublishEvent_publishEvent_event {
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
  publishedAt: any | null;
  translations: PublishEvent_publishEvent_event_translations[];
}

export interface PublishEvent_publishEvent {
  event: PublishEvent_publishEvent_event | null;
}

export interface PublishEvent {
  publishEvent: PublishEvent_publishEvent | null;
}

export interface PublishEventVariables {
  input: PublishEventMutationInput;
}
