/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EventParticipantsPerInvite {
  CHILD_AND_1_OR_2_GUARDIANS = "CHILD_AND_1_OR_2_GUARDIANS",
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

/**
 * An enumeration.
 */
export enum MessageProtocol {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

/**
 * An enumeration.
 */
export enum MessageTranslationLanguageCode {
  EN = "EN",
  FI = "FI",
  SV = "SV",
}

/**
 * An enumeration.
 */
export enum ProtocolType {
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum RecipientSelectionEnum {
  ALL = "ALL",
  ATTENDED = "ATTENDED",
  ENROLLED = "ENROLLED",
  INVITED = "INVITED",
  SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION = "SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION",
}

export enum TicketSystem {
  INTERNAL = "INTERNAL",
  TICKETMASTER = "TICKETMASTER",
}

export interface AddEventGroupMutationInput {
  translations?: (EventGroupTranslationsInput | null)[] | null;
  image?: any | null;
  projectId: string;
  clientMutationId?: string | null;
}

export interface AddEventMutationInput {
  translations?: (EventTranslationsInput | null)[] | null;
  duration?: number | null;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence?: number | null;
  image?: any | null;
  projectId: string;
  eventGroupId?: string | null;
  readyForEventGroupPublishing?: boolean | null;
  ticketSystem?: AddEventTicketSystemInput | null;
  clientMutationId?: string | null;
}

export interface AddEventTicketSystemInput {
  type: TicketSystem;
  url?: string | null;
  endTime?: string | null;
}

export interface AddMessageMutationInput {
  protocol: ProtocolType;
  translations?: (MessageTranslationsInput | null)[] | null;
  projectId: string;
  recipientSelection: RecipientSelectionEnum;
  eventId?: string | null;
  occurrenceIds?: string[] | null;
  sendDirectly?: boolean | null;
  clientMutationId?: string | null;
}

export interface AddOccurrenceMutationInput {
  time: any;
  eventId: string;
  venueId: string;
  occurrenceLanguage?: Language | null;
  capacityOverride?: number | null;
  ticketSystem?: OccurrenceTicketSystemInput | null;
  clientMutationId?: string | null;
}

export interface AddVenueMutationInput {
  translations?: (VenueTranslationsInput | null)[] | null;
  projectId: string;
  clientMutationId?: string | null;
}

export interface DeleteEventGroupMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteEventMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface DeleteMessageMutationInput {
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

export interface EventGroupTranslationsInput {
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  imageAltText?: string | null;
  languageCode: Language;
}

export interface EventTranslationsInput {
  name?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  imageAltText?: string | null;
  languageCode: Language;
}

export interface ImportTicketSystemPasswordsMutationInput {
  eventId: string;
  passwords: string[];
  clientMutationId?: string | null;
}

export interface MessageTranslationsInput {
  languageCode: Language;
  subject?: string | null;
  bodyText?: string | null;
}

export interface OccurrenceTicketSystemInput {
  url?: string | null;
}

export interface PublishEventGroupMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface PublishEventMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface SendMessageMutationInput {
  id: string;
  clientMutationId?: string | null;
}

export interface SetEnrolmentAttendanceMutationInput {
  enrolmentId: string;
  attended?: boolean | null;
  clientMutationId?: string | null;
}

export interface UpdateEventGroupMutationInput {
  id: string;
  image?: any | null;
  translations?: (EventGroupTranslationsInput | null)[] | null;
  projectId?: string | null;
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
  eventGroupId?: string | null;
  readyForEventGroupPublishing?: boolean | null;
  ticketSystem?: UpdateEventTicketSystemInput | null;
  clientMutationId?: string | null;
}

export interface UpdateEventTicketSystemInput {
  url?: string | null;
  endTime?: string | null;
}

export interface UpdateMessageMutationInput {
  id: string;
  protocol?: ProtocolType | null;
  translations?: (MessageTranslationsInput | null)[] | null;
  projectId?: string | null;
  recipientSelection?: RecipientSelectionEnum | null;
  eventId?: string | null;
  occurrenceIds?: string[] | null;
  clientMutationId?: string | null;
}

export interface UpdateOccurrenceMutationInput {
  id: string;
  time?: any | null;
  eventId?: string | null;
  venueId?: string | null;
  occurrenceLanguage?: Language | null;
  capacityOverride?: number | null;
  ticketSystem?: OccurrenceTicketSystemInput | null;
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
