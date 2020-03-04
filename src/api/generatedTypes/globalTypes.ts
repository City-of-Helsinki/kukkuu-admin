/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
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

export interface AddVenueMutationInput {
  translations?: (VenueTranslationsInput | null)[] | null;
  clientMutationId?: string | null;
}

export interface VenueTranslationsInput {
  name: string;
  description?: string | null;
  languageCode: Language;
  address?: string | null;
  accessibilityInfo?: string | null;
  arrivalInstructions?: string | null;
  additionalInfo?: string | null;
  wwwUrl?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
