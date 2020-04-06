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
  clientMutationId?: string | null;
}

export interface AddVenueMutationInput {
  translations?: (VenueTranslationsInput | null)[] | null;
  clientMutationId?: string | null;
}

export interface EventTranslationsInput {
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  imageAltText?: string | null;
  languageCode: Language;
}

export interface UpdateVenueMutationInput {
  id: string;
  translations?: (VenueTranslationsInput | null)[] | null;
  deleteTranslations?: (Language | null)[] | null;
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
