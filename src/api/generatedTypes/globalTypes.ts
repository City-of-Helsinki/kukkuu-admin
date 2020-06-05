/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EventParticipantsPerInvite {
  CHILD_AND_GUARDIAN = "CHILD_AND_GUARDIAN",
  FAMILY = "FAMILY",
}

/**
 * An enumeration.
 */
export enum Language {
  EN = "EN",
  FI = "FI",
  SV = "SV",
}

export interface AddEventMutationInput {
  translations?: (EventTranslationsInput | null)[] | null;
  duration?: number | null;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  image?: any | null;
  projectId: string;
  clientMutationId?: string | null;
}

export interface AddOccurrenceMutationInput {
  time: any;
  eventId: string;
  venueId: string;
  occurrenceLanguage?: Language | null;
  clientMutationId?: string | null;
}

export interface AddVenueMutationInput {
  translations?: (VenueTranslationsInput | null)[] | null;
  projectId: string;
  clientMutationId?: string | null;
}

export interface DeleteEventMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteOccurrenceMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteVenueMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface EventTranslationsInput {
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  imageAltText?: string | null;
  languageCode: Language;
}

export interface PublishEventMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface UpdateEventMutationInput {
  id: string;
  duration?: number | null;
  participantsPerInvite?: EventParticipantsPerInvite | null;
  capacityPerOccurrence?: number | null;
  image?: any | null;
  translations?: (EventTranslationsInput | null)[] | null;
  projectId?: string | null;
  clientMutationId?: string | null;
}

export interface UpdateOccurrenceMutationInput {
  id: string;
  time?: any | null;
  eventId?: string | null;
  venueId?: string | null;
  occurrenceLanguage?: Language | null;
  clientMutationId?: string | null;
}

export interface UpdateVenueMutationInput {
  id: string;
  translations?: (VenueTranslationsInput | null)[] | null;
  projectId?: string | null;
  clientMutationId?: string | null;
}

export interface VenueTranslationsInput {
  name?: string | null;
  description?: string | null;
  languageCode: Language;
  address?: string | null;
  accessibilityInfo?: string | null;
  arrivalInstructions?: string | null;
  additionalInfo?: string | null;
  wwwUrl?: string | null;
  wcAndFacilities?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
