/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddEventMutationInput, EventParticipantsPerInvite, TicketSystem, Language } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddEvent
// ====================================================

export interface AddEvent_addEvent_event_ticketSystem_InternalEventTicketSystem {
  type: TicketSystem;
}

export interface AddEvent_addEvent_event_ticketSystem_TicketmasterEventTicketSystem {
  type: TicketSystem;
  url: string;
  endTime: any | null;
}

export type AddEvent_addEvent_event_ticketSystem = AddEvent_addEvent_event_ticketSystem_InternalEventTicketSystem | AddEvent_addEvent_event_ticketSystem_TicketmasterEventTicketSystem;

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
  capacityPerOccurrence: number | null;
  /**
   * In minutes
   */
  duration: number | null;
  ticketSystem: AddEvent_addEvent_event_ticketSystem | null;
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
