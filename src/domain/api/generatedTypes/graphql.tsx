import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddChildMutationInput = {
  birthyear: Scalars['Int']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  languagesSpokenAtHome?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  relationship?: InputMaybe<RelationshipInput>;
};

export type AddChildMutationPayload = {
  __typename?: 'AddChildMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type AddEventGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  projectId: Scalars['ID']['input'];
  translations?: InputMaybe<Array<InputMaybe<EventGroupTranslationsInput>>>;
};

export type AddEventGroupMutationPayload = {
  __typename?: 'AddEventGroupMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  eventGroup: Maybe<EventGroupNode>;
};

export type AddEventMutationInput = {
  /** Required for internal ticket system events. */
  capacityPerOccurrence?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  eventGroupId?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['Upload']['input']>;
  participantsPerInvite: EventParticipantsPerInvite;
  projectId: Scalars['ID']['input'];
  readyForEventGroupPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  ticketSystem?: InputMaybe<AddEventTicketSystemInput>;
  translations?: InputMaybe<Array<InputMaybe<EventTranslationsInput>>>;
};

export type AddEventMutationPayload = {
  __typename?: 'AddEventMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  event: Maybe<EventNode>;
};

export type AddEventTicketSystemInput = {
  endTime?: InputMaybe<Scalars['String']['input']>;
  type: TicketSystem;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type AddMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  occurrenceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  projectId: Scalars['ID']['input'];
  protocol: ProtocolType;
  /** Set the scope for message recipients. The 'ALL' is valid only when a user has a specific permission. */
  recipientSelection: RecipientSelectionEnum;
  /** Sends the message directly after the save */
  sendDirectly?: InputMaybe<Scalars['Boolean']['input']>;
  translations?: InputMaybe<Array<InputMaybe<MessageTranslationsInput>>>;
};

export type AddMessageMutationPayload = {
  __typename?: 'AddMessageMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  message: Maybe<MessageNode>;
};

export type AddOccurrenceMutationInput = {
  capacityOverride?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  occurrenceLanguage?: InputMaybe<Language>;
  ticketSystem?: InputMaybe<OccurrenceTicketSystemInput>;
  time: Scalars['DateTime']['input'];
  venueId: Scalars['ID']['input'];
};

export type AddOccurrenceMutationPayload = {
  __typename?: 'AddOccurrenceMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  occurrence: Maybe<OccurrenceNode>;
};

export type AddVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
  translations?: InputMaybe<Array<InputMaybe<VenueTranslationsInput>>>;
};

export type AddVenueMutationPayload = {
  __typename?: 'AddVenueMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  venue: Maybe<VenueNode>;
};

export type AdminNode = Node & {
  __typename?: 'AdminNode';
  email: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  projects: Maybe<ProjectNodeConnection>;
  /** Vaaditaan. Enintään 150 merkkiä. Vain kirjaimet, numerot ja @/./+/-/_ ovat sallittuja. */
  username: Scalars['String']['output'];
};


export type AdminNodeProjectsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};

export type AssignTicketSystemPasswordMutationInput = {
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
};

export type AssignTicketSystemPasswordMutationPayload = {
  __typename?: 'AssignTicketSystemPasswordMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
  event: Maybe<EventNode>;
  /** The assigned ticket system password */
  password: Maybe<Scalars['String']['output']>;
};

/** A new Child input */
export type ChildInput = {
  birthyear: Scalars['Int']['input'];
  languagesSpokenAtHome?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  relationship?: InputMaybe<RelationshipInput>;
};

export type ChildNode = Node & {
  __typename?: 'ChildNode';
  /** All upcoming and ongoing (with leeway) internal and ticket system enrolments sorted by time. */
  activeInternalAndTicketSystemEnrolments: Maybe<InternalOrTicketSystemEnrolmentConnection>;
  /** @deprecated Doesn't exclude events when yearly limit of enrolments have been exceeded. */
  availableEvents: Maybe<EventConnection>;
  /** @deprecated Doesn't exclude events when yearly limit of enrolments have been exceeded. */
  availableEventsAndEventGroups: Maybe<EventOrEventGroupConnection>;
  birthyear: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** How many enrolments child has this year. */
  enrolmentCount: Maybe<Scalars['Int']['output']>;
  enrolments: EnrolmentNodeConnection;
  freeSpotNotificationSubscriptions: FreeSpotNotificationSubscriptionNodeConnection;
  guardians: GuardianNodeConnection;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  languagesSpokenAtHome: Maybe<LanguageNodeConnection>;
  name: Scalars['String']['output'];
  occurrences: OccurrenceNodeConnection;
  /** How many past enrolments child has this year. */
  pastEnrolmentCount: Maybe<Scalars['Int']['output']>;
  pastEvents: Maybe<EventConnection>;
  postalCode: Scalars['String']['output'];
  project: ProjectNode;
  relationships: RelationshipNodeConnection;
  /** All upcoming events and event groups for the child's project. */
  upcomingEventsAndEventGroups: Maybe<EventOrEventGroupConnection>;
  updatedAt: Scalars['DateTime']['output'];
};


export type ChildNodeActiveInternalAndTicketSystemEnrolmentsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeAvailableEventsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeAvailableEventsAndEventGroupsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeEnrolmentCountArgs = {
  year: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeEnrolmentsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeFreeSpotNotificationSubscriptionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  childId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceId: InputMaybe<Scalars['ID']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeGuardiansArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeLanguagesSpokenAtHomeArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeOccurrencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  date: InputMaybe<Scalars['Date']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceLanguage: InputMaybe<Scalars['String']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['Time']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithLeeway: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithOngoing: InputMaybe<Scalars['Boolean']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
};


export type ChildNodePastEventsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeRelationshipsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type ChildNodeUpcomingEventsAndEventGroupsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
};

export type ChildNodeConnection = {
  __typename?: 'ChildNodeConnection';
  count: Scalars['Int']['output'];
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChildNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ChildNode` and its cursor. */
export type ChildNodeEdge = {
  __typename?: 'ChildNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<ChildNode>;
};

/** Node for handling child's notes separately from their other data. */
export type ChildNotesNode = Node & {
  __typename?: 'ChildNotesNode';
  childId: Maybe<Scalars['ID']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  notes: Scalars['String']['output'];
};

export type DeleteChildMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteChildMutationPayload = {
  __typename?: 'DeleteChildMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type DeleteEventGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteEventGroupMutationPayload = {
  __typename?: 'DeleteEventGroupMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type DeleteEventMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteEventMutationPayload = {
  __typename?: 'DeleteEventMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type DeleteMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteMessageMutationPayload = {
  __typename?: 'DeleteMessageMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type DeleteOccurrenceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteOccurrenceMutationPayload = {
  __typename?: 'DeleteOccurrenceMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type DeleteVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteVenueMutationPayload = {
  __typename?: 'DeleteVenueMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type EnrolOccurrenceMutationInput = {
  /** Guardian's child id */
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Occurrence id of event */
  occurrenceId: Scalars['ID']['input'];
};

export type EnrolOccurrenceMutationPayload = {
  __typename?: 'EnrolOccurrenceMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  enrolment: Maybe<EnrolmentNode>;
};

export type EnrolmentNode = Node & {
  __typename?: 'EnrolmentNode';
  attended: Maybe<Scalars['Boolean']['output']>;
  child: Maybe<ChildNode>;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  occurrence: OccurrenceNode;
  /** An unique encoded reference id */
  referenceId: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type EnrolmentNodeConnection = {
  __typename?: 'EnrolmentNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EnrolmentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EnrolmentNode` and its cursor. */
export type EnrolmentNodeEdge = {
  __typename?: 'EnrolmentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<EnrolmentNode>;
};

/**
 * A generic error type that can be used to add errors inside the data,
 * when using the errors field from the root is not possible.
 *
 * NOTE: Normally the errors should be added in the errors field
 * which is located in the root of the query, next to data, but in some cases,
 * e.g. with mutation input errors (without exception thrown),
 * the error messages meta class field is not available
 */
export type ErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type EventConnection = {
  __typename?: 'EventConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Event` and its cursor. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<EventNode>;
};

export type EventGroupNode = Node & {
  __typename?: 'EventGroupNode';
  canChildEnroll: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  events: EventNodeConnection;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  imageAltText: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  project: ProjectNode;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  shortDescription: Maybe<Scalars['String']['output']>;
  translations: Array<EventGroupTranslationType>;
  updatedAt: Scalars['DateTime']['output'];
};


export type EventGroupNodeCanChildEnrollArgs = {
  childId: Scalars['ID']['input'];
};


export type EventGroupNodeEventsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  availableForChild: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
};

export type EventGroupTranslationType = {
  __typename?: 'EventGroupTranslationType';
  description: Scalars['String']['output'];
  imageAltText: Scalars['String']['output'];
  languageCode: Language;
  name: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
};

export type EventGroupTranslationsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageAltText?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
  name?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type EventNode = Node & {
  __typename?: 'EventNode';
  canChildEnroll: Maybe<Scalars['Boolean']['output']>;
  capacityPerOccurrence: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  /** In minutes */
  duration: Maybe<Scalars['Int']['output']>;
  eventGroup: Maybe<EventGroupNode>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  imageAltText: Maybe<Scalars['String']['output']>;
  messages: MessageNodeConnection;
  name: Maybe<Scalars['String']['output']>;
  occurrences: OccurrenceNodeConnection;
  participantsPerInvite: EventParticipantsPerInvite;
  project: ProjectNode;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  readyForEventGroupPublishing: Scalars['Boolean']['output'];
  shortDescription: Maybe<Scalars['String']['output']>;
  ticketSystem: Maybe<EventTicketSystem>;
  translations: Array<EventTranslationType>;
  updatedAt: Scalars['DateTime']['output'];
};


export type EventNodeCanChildEnrollArgs = {
  childId: Scalars['ID']['input'];
};


export type EventNodeMessagesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrences: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Scalars['String']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
  protocol: InputMaybe<MessagingMessageProtocolChoices>;
};


export type EventNodeOccurrencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  date: InputMaybe<Scalars['Date']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceLanguage: InputMaybe<Scalars['String']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['Time']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithLeeway: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithOngoing: InputMaybe<Scalars['Boolean']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
};

export type EventNodeConnection = {
  __typename?: 'EventNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventNode` and its cursor. */
export type EventNodeEdge = {
  __typename?: 'EventNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<EventNode>;
};

export type EventOrEventGroupConnection = {
  __typename?: 'EventOrEventGroupConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventOrEventGroupEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventOrEventGroup` and its cursor. */
export type EventOrEventGroupEdge = {
  __typename?: 'EventOrEventGroupEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<EventOrEventGroupUnion>;
};

export type EventOrEventGroupUnion = EventGroupNode | EventNode;

export enum EventParticipantsPerInvite {
  ChildAnd_1Or_2Guardians = 'CHILD_AND_1_OR_2_GUARDIANS',
  ChildAndGuardian = 'CHILD_AND_GUARDIAN',
  Family = 'FAMILY'
}

export type EventTicketSystem = {
  type: TicketSystem;
};

export type EventTranslationType = {
  __typename?: 'EventTranslationType';
  description: Scalars['String']['output'];
  imageAltText: Scalars['String']['output'];
  languageCode: Language;
  name: Scalars['String']['output'];
  shortDescription: Scalars['String']['output'];
};

export type EventTranslationsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  imageAltText?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
  name?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
};

export type FreeSpotNotificationSubscriptionNode = Node & {
  __typename?: 'FreeSpotNotificationSubscriptionNode';
  child: ChildNode;
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  occurrence: Maybe<OccurrenceNode>;
};

export type FreeSpotNotificationSubscriptionNodeConnection = {
  __typename?: 'FreeSpotNotificationSubscriptionNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FreeSpotNotificationSubscriptionNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FreeSpotNotificationSubscriptionNode` and its cursor. */
export type FreeSpotNotificationSubscriptionNodeEdge = {
  __typename?: 'FreeSpotNotificationSubscriptionNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<FreeSpotNotificationSubscriptionNode>;
};

export type GuardianCommunicationSubscriptionsNode = Node & {
  __typename?: 'GuardianCommunicationSubscriptionsNode';
  firstName: Scalars['String']['output'];
  hasAcceptedCommunication: Scalars['Boolean']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  language: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type GuardianInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  hasAcceptedCommunication?: InputMaybe<Scalars['Boolean']['input']>;
  language: Language;
  languagesSpokenAtHome?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type GuardianNode = Node & {
  __typename?: 'GuardianNode';
  children: ChildNodeConnection;
  createdAt: Scalars['DateTime']['output'];
  /** If left blank, will be populated with the user's email. */
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  hasAcceptedCommunication: Scalars['Boolean']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  language: Language;
  languagesSpokenAtHome: LanguageNodeConnection;
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  relationships: RelationshipNodeConnection;
  updatedAt: Scalars['DateTime']['output'];
  user: AdminNode;
};


export type GuardianNodeChildrenArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
};


export type GuardianNodeLanguagesSpokenAtHomeArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type GuardianNodeRelationshipsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};

export type GuardianNodeConnection = {
  __typename?: 'GuardianNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GuardianNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `GuardianNode` and its cursor. */
export type GuardianNodeEdge = {
  __typename?: 'GuardianNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<GuardianNode>;
};

export type ImportTicketSystemPasswordsMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  passwords: Array<Scalars['String']['input']>;
};

export type ImportTicketSystemPasswordsMutationPayload = {
  __typename?: 'ImportTicketSystemPasswordsMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  /** A list of passwords which could not be imported */
  errors: Maybe<Array<Maybe<ErrorType>>>;
  event: Maybe<EventNode>;
  /** A list of imported passwords */
  passwords: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type InternalEventTicketSystem = EventTicketSystem & {
  __typename?: 'InternalEventTicketSystem';
  type: TicketSystem;
};

export type InternalOccurrenceTicketSystem = OccurrenceTicketSystem & {
  __typename?: 'InternalOccurrenceTicketSystem';
  type: TicketSystem;
};

export type InternalOrTicketSystemEnrolmentConnection = {
  __typename?: 'InternalOrTicketSystemEnrolmentConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InternalOrTicketSystemEnrolmentEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `InternalOrTicketSystemEnrolment` and its cursor. */
export type InternalOrTicketSystemEnrolmentEdge = {
  __typename?: 'InternalOrTicketSystemEnrolmentEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<InternalOrTicketSystemEnrolmentUnion>;
};

export type InternalOrTicketSystemEnrolmentUnion = EnrolmentNode | LippupisteEnrolmentNode | TicketmasterEnrolmentNode | TixlyEnrolmentNode;

/** An enumeration. */
export enum Language {
  En = 'EN',
  Fi = 'FI',
  Sv = 'SV'
}

export type LanguageNode = Node & {
  __typename?: 'LanguageNode';
  /** ISO 639-3 (language) or ISO 639-5 (language family) alpha-3 code */
  alpha3Code: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  translations: Array<LanguageTranslationType>;
};

export type LanguageNodeConnection = {
  __typename?: 'LanguageNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LanguageNode` and its cursor. */
export type LanguageNodeEdge = {
  __typename?: 'LanguageNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<LanguageNode>;
};

export type LanguageTranslationType = {
  __typename?: 'LanguageTranslationType';
  languageCode: LanguagesLanguageTranslationLanguageCodeChoices;
  name: Scalars['String']['output'];
};

/** An enumeration. */
export enum LanguagesLanguageTranslationLanguageCodeChoices {
  /** englanti */
  En = 'EN',
  /** suomi */
  Fi = 'FI',
  /** ruotsi */
  Sv = 'SV'
}

export type LippupisteEnrolmentNode = Node & {
  __typename?: 'LippupisteEnrolmentNode';
  createdAt: Scalars['DateTime']['output'];
  event: EventNode;
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type LippupisteEventTicketSystem = EventTicketSystem & {
  __typename?: 'LippupisteEventTicketSystem';
  childPassword: Maybe<Scalars['String']['output']>;
  endTime: Maybe<Scalars['DateTime']['output']>;
  freePasswordCount: Scalars['Int']['output'];
  type: TicketSystem;
  url: Scalars['String']['output'];
  usedPasswordCount: Scalars['Int']['output'];
};


export type LippupisteEventTicketSystemChildPasswordArgs = {
  childId: InputMaybe<Scalars['ID']['input']>;
};

export type LippupisteOccurrenceTicketSystem = OccurrenceTicketSystem & {
  __typename?: 'LippupisteOccurrenceTicketSystem';
  type: TicketSystem;
  url: Scalars['String']['output'];
};

export type MessageNode = Node & {
  __typename?: 'MessageNode';
  bodyText: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  event: Maybe<EventNode>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  occurrences: OccurrenceNodeConnection;
  project: ProjectNode;
  protocol: MessagingMessageProtocolChoices;
  recipientCount: Maybe<Scalars['Int']['output']>;
  recipientSelection: Maybe<RecipientSelectionEnum>;
  sentAt: Maybe<Scalars['DateTime']['output']>;
  subject: Maybe<Scalars['String']['output']>;
  translations: Array<MessageTranslationType>;
  updatedAt: Scalars['DateTime']['output'];
};


export type MessageNodeOccurrencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  date: InputMaybe<Scalars['Date']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceLanguage: InputMaybe<Scalars['String']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['Time']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithLeeway: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithOngoing: InputMaybe<Scalars['Boolean']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
};

export type MessageNodeConnection = {
  __typename?: 'MessageNodeConnection';
  count: Scalars['Int']['output'];
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MessageNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `MessageNode` and its cursor. */
export type MessageNodeEdge = {
  __typename?: 'MessageNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<MessageNode>;
};

export type MessageTranslationType = {
  __typename?: 'MessageTranslationType';
  bodyText: Scalars['String']['output'];
  languageCode: MessagingMessageTranslationLanguageCodeChoices;
  subject: Scalars['String']['output'];
};

export type MessageTranslationsInput = {
  bodyText?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
  subject?: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum MessagingMessageProtocolChoices {
  /** Sähköposti */
  Email = 'EMAIL',
  /** SMS */
  Sms = 'SMS'
}

/** An enumeration. */
export enum MessagingMessageTranslationLanguageCodeChoices {
  /** englanti */
  En = 'EN',
  /** suomi */
  Fi = 'FI',
  /** ruotsi */
  Sv = 'SV'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** This mutation cannot be used before one has started using the service with "SubmitChildrenAndGuardianMutation". */
  addChild: Maybe<AddChildMutationPayload>;
  addEvent: Maybe<AddEventMutationPayload>;
  addEventGroup: Maybe<AddEventGroupMutationPayload>;
  addMessage: Maybe<AddMessageMutationPayload>;
  addOccurrence: Maybe<AddOccurrenceMutationPayload>;
  addVenue: Maybe<AddVenueMutationPayload>;
  assignTicketSystemPassword: Maybe<AssignTicketSystemPasswordMutationPayload>;
  deleteChild: Maybe<DeleteChildMutationPayload>;
  deleteEvent: Maybe<DeleteEventMutationPayload>;
  deleteEventGroup: Maybe<DeleteEventGroupMutationPayload>;
  deleteMessage: Maybe<DeleteMessageMutationPayload>;
  deleteOccurrence: Maybe<DeleteOccurrenceMutationPayload>;
  deleteVenue: Maybe<DeleteVenueMutationPayload>;
  enrolOccurrence: Maybe<EnrolOccurrenceMutationPayload>;
  importTicketSystemPasswords: Maybe<ImportTicketSystemPasswordsMutationPayload>;
  publishEvent: Maybe<PublishEventMutationPayload>;
  publishEventGroup: Maybe<PublishEventGroupMutationPayload>;
  requestEmailUpdateToken: Maybe<RequestEmailUpdateTokenMutationPayload>;
  sendMessage: Maybe<SendMessageMutationPayload>;
  setEnrolmentAttendance: Maybe<SetEnrolmentAttendanceMutationPayload>;
  /** This is the first mutation one needs to execute to start using the service. After that this mutation cannot be used anymore. */
  submitChildrenAndGuardian: Maybe<SubmitChildrenAndGuardianMutationPayload>;
  subscribeToFreeSpotNotification: Maybe<SubscribeToFreeSpotNotificationMutationPayload>;
  unenrolOccurrence: Maybe<UnenrolOccurrenceMutationPayload>;
  /**
   * Unsubscribe user from all the notifications.
   *
   * NOTE: This mutation deletes the user's FreeSpotNotifications,
   * which are linked to a Child and Occurrence instances.
   * **It should be noted that the current model architecture allows
   * that a child can have multiple guardians, so unsubscribe can delete
   * some notifications from other users as well. However, the UI apps
   * has never allowed more than 1 guardian for a child.**
   */
  unsubscribeFromAllNotifications: Maybe<UnsubscribeFromAllNotificationsMutationPayload>;
  unsubscribeFromFreeSpotNotification: Maybe<UnsubscribeFromFreeSpotNotificationMutationPayload>;
  updateChild: Maybe<UpdateChildMutationPayload>;
  updateChildNotes: Maybe<UpdateChildNotesMutationPayload>;
  updateEvent: Maybe<UpdateEventMutationPayload>;
  updateEventGroup: Maybe<UpdateEventGroupMutationPayload>;
  updateMessage: Maybe<UpdateMessageMutationPayload>;
  updateMyCommunicationSubscriptions: Maybe<UpdateMyCommunicationSubscriptionsMutationPayload>;
  updateMyEmail: Maybe<UpdateMyEmailMutationPayload>;
  updateMyProfile: Maybe<UpdateMyProfileMutationPayload>;
  updateOccurrence: Maybe<UpdateOccurrenceMutationPayload>;
  updateTicketAttended: Maybe<UpdateTicketAttendedMutationPayload>;
  updateVenue: Maybe<UpdateVenueMutationPayload>;
};


export type MutationAddChildArgs = {
  input: AddChildMutationInput;
};


export type MutationAddEventArgs = {
  input: AddEventMutationInput;
};


export type MutationAddEventGroupArgs = {
  input: AddEventGroupMutationInput;
};


export type MutationAddMessageArgs = {
  input: AddMessageMutationInput;
};


export type MutationAddOccurrenceArgs = {
  input: AddOccurrenceMutationInput;
};


export type MutationAddVenueArgs = {
  input: AddVenueMutationInput;
};


export type MutationAssignTicketSystemPasswordArgs = {
  input: AssignTicketSystemPasswordMutationInput;
};


export type MutationDeleteChildArgs = {
  input: DeleteChildMutationInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventMutationInput;
};


export type MutationDeleteEventGroupArgs = {
  input: DeleteEventGroupMutationInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageMutationInput;
};


export type MutationDeleteOccurrenceArgs = {
  input: DeleteOccurrenceMutationInput;
};


export type MutationDeleteVenueArgs = {
  input: DeleteVenueMutationInput;
};


export type MutationEnrolOccurrenceArgs = {
  input: EnrolOccurrenceMutationInput;
};


export type MutationImportTicketSystemPasswordsArgs = {
  input: ImportTicketSystemPasswordsMutationInput;
};


export type MutationPublishEventArgs = {
  input: PublishEventMutationInput;
};


export type MutationPublishEventGroupArgs = {
  input: PublishEventGroupMutationInput;
};


export type MutationRequestEmailUpdateTokenArgs = {
  input: RequestEmailUpdateTokenMutationInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageMutationInput;
};


export type MutationSetEnrolmentAttendanceArgs = {
  input: SetEnrolmentAttendanceMutationInput;
};


export type MutationSubmitChildrenAndGuardianArgs = {
  input: SubmitChildrenAndGuardianMutationInput;
};


export type MutationSubscribeToFreeSpotNotificationArgs = {
  input: SubscribeToFreeSpotNotificationMutationInput;
};


export type MutationUnenrolOccurrenceArgs = {
  input: UnenrolOccurrenceMutationInput;
};


export type MutationUnsubscribeFromAllNotificationsArgs = {
  input: UnsubscribeFromAllNotificationsMutationInput;
};


export type MutationUnsubscribeFromFreeSpotNotificationArgs = {
  input: UnsubscribeFromFreeSpotNotificationMutationInput;
};


export type MutationUpdateChildArgs = {
  input: UpdateChildMutationInput;
};


export type MutationUpdateChildNotesArgs = {
  input: UpdateChildNotesMutationInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventMutationInput;
};


export type MutationUpdateEventGroupArgs = {
  input: UpdateEventGroupMutationInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageMutationInput;
};


export type MutationUpdateMyCommunicationSubscriptionsArgs = {
  input: UpdateMyCommunicationSubscriptionsMutationInput;
};


export type MutationUpdateMyEmailArgs = {
  input: UpdateMyEmailMutationInput;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateMyProfileMutationInput;
};


export type MutationUpdateOccurrenceArgs = {
  input: UpdateOccurrenceMutationInput;
};


export type MutationUpdateTicketAttendedArgs = {
  input: UpdateTicketAttendedMutationInput;
};


export type MutationUpdateVenueArgs = {
  input: UpdateVenueMutationInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type OccurrenceArrivalStatusNode = {
  __typename?: 'OccurrenceArrivalStatusNode';
  /**
   * **DEPRECATED:**  Number of enrolments marked as attended for this occurrence.
   * @deprecated This field exposes potentially sensitive data and will be removed in a future release. Consider using a more secure method to access this information.
   */
  attendedEnrolmentCount: Scalars['Int']['output'];
  /**
   * **DEPRECATED:** Total number of enrolments for this occurrence.
   * @deprecated This field exposes potentially sensitive data and will be removed in a future release. Consider using a more secure method to access this information.
   */
  enrolmentCount: Scalars['Int']['output'];
};

export type OccurrenceNode = Node & {
  __typename?: 'OccurrenceNode';
  attendedEnrolmentCount: Scalars['Int']['output'];
  capacity: Maybe<Scalars['Int']['output']>;
  /** When set will be used as the capacity of this occurrence instead of the value coming from the event. */
  capacityOverride: Maybe<Scalars['Int']['output']>;
  childHasFreeSpotNotificationSubscription: Maybe<Scalars['Boolean']['output']>;
  children: ChildNodeConnection;
  createdAt: Scalars['DateTime']['output'];
  enrolmentCount: Scalars['Int']['output'];
  enrolments: EnrolmentNodeConnection;
  event: EventNode;
  freeSpotNotificationSubscriptionCount: Scalars['Int']['output'];
  freeSpotNotificationSubscriptions: FreeSpotNotificationSubscriptionNodeConnection;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  occurrenceLanguage: Language;
  remainingCapacity: Maybe<Scalars['Int']['output']>;
  /** @deprecated There is no need for this because the only field ticketSystemUrl has been moved to EventNode.ticketSystem. */
  ticketSystem: Maybe<OccurrenceTicketSystem>;
  time: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  venue: VenueNode;
};


export type OccurrenceNodeChildHasFreeSpotNotificationSubscriptionArgs = {
  childId: InputMaybe<Scalars['ID']['input']>;
};


export type OccurrenceNodeChildrenArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
};


export type OccurrenceNodeEnrolmentsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type OccurrenceNodeFreeSpotNotificationSubscriptionsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  childId: InputMaybe<Scalars['ID']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceId: InputMaybe<Scalars['ID']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};

export type OccurrenceNodeConnection = {
  __typename?: 'OccurrenceNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OccurrenceNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OccurrenceNode` and its cursor. */
export type OccurrenceNodeEdge = {
  __typename?: 'OccurrenceNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<OccurrenceNode>;
};

export type OccurrenceTicketSystem = {
  type: TicketSystem;
};

export type OccurrenceTicketSystemInput = {
  url?: InputMaybe<Scalars['String']['input']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']['output']>;
};

export type ProjectNode = Node & {
  __typename?: 'ProjectNode';
  /** How many times a single user can participate events per year. Changing this will not affect any existing enrolments. */
  enrolmentLimit: Scalars['Int']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  myPermissions: Maybe<ProjectPermissionsType>;
  name: Maybe<Scalars['String']['output']>;
  /** Whether it is allowed to create events outside event groups. */
  singleEventsAllowed: Scalars['Boolean']['output'];
  translations: Array<ProjectTranslationType>;
  year: Scalars['Int']['output'];
};

export type ProjectNodeConnection = {
  __typename?: 'ProjectNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProjectNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProjectNode` and its cursor. */
export type ProjectNodeEdge = {
  __typename?: 'ProjectNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<ProjectNode>;
};

export type ProjectPermissionsType = {
  __typename?: 'ProjectPermissionsType';
  canSendToAllInProject: Maybe<Scalars['Boolean']['output']>;
  manageEventGroups: Maybe<Scalars['Boolean']['output']>;
  publish: Maybe<Scalars['Boolean']['output']>;
};

export type ProjectTranslationType = {
  __typename?: 'ProjectTranslationType';
  languageCode: Language;
  name: Scalars['String']['output'];
};

/** An enumeration. */
export enum ProtocolType {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type PublishEventGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type PublishEventGroupMutationPayload = {
  __typename?: 'PublishEventGroupMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  eventGroup: Maybe<EventGroupNode>;
};

export type PublishEventMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type PublishEventMutationPayload = {
  __typename?: 'PublishEventMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  event: Maybe<EventNode>;
};

export type Query = {
  __typename?: 'Query';
  child: Maybe<ChildNode>;
  childNotes: Maybe<ChildNotesNode>;
  children: Maybe<ChildNodeConnection>;
  event: Maybe<EventNode>;
  eventGroup: Maybe<EventGroupNode>;
  events: Maybe<EventNodeConnection>;
  eventsAndEventGroups: Maybe<EventOrEventGroupConnection>;
  guardians: Maybe<GuardianNodeConnection>;
  language: Maybe<LanguageNode>;
  languages: Maybe<LanguageNodeConnection>;
  message: Maybe<MessageNode>;
  messages: Maybe<MessageNodeConnection>;
  myAdminProfile: Maybe<AdminNode>;
  myCommunicationSubscriptions: Maybe<GuardianCommunicationSubscriptionsNode>;
  myProfile: Maybe<GuardianNode>;
  occurrence: Maybe<OccurrenceNode>;
  occurrences: Maybe<OccurrenceNodeConnection>;
  project: Maybe<ProjectNode>;
  projects: Maybe<ProjectNodeConnection>;
  venue: Maybe<VenueNode>;
  venues: Maybe<VenueNodeConnection>;
  verifyTicket: Maybe<TicketVerificationNode>;
};


export type QueryChildArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChildNotesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChildrenArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  availableForChild: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryEventsAndEventGroupsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGuardiansArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLanguageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLanguagesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMessagesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  occurrences: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Scalars['String']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
  protocol: InputMaybe<MessagingMessageProtocolChoices>;
};


export type QueryMyCommunicationSubscriptionsArgs = {
  authToken: InputMaybe<Scalars['String']['input']>;
};


export type QueryOccurrenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOccurrencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  date: InputMaybe<Scalars['Date']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceLanguage: InputMaybe<Scalars['String']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['Time']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithLeeway: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithOngoing: InputMaybe<Scalars['Boolean']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectsArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVenueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVenuesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVerifyTicketArgs = {
  referenceId: Scalars['String']['input'];
};

export enum RecipientSelectionEnum {
  All = 'ALL',
  Attended = 'ATTENDED',
  Enrolled = 'ENROLLED',
  Invited = 'INVITED',
  SubscribedToFreeSpotNotification = 'SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION'
}

export type RelationshipInput = {
  type?: InputMaybe<RelationshipTypeEnum>;
};

export type RelationshipNode = Node & {
  __typename?: 'RelationshipNode';
  child: ChildNode;
  guardian: GuardianNode;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  type: Maybe<RelationshipTypeEnum>;
};

export type RelationshipNodeConnection = {
  __typename?: 'RelationshipNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RelationshipNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RelationshipNode` and its cursor. */
export type RelationshipNodeEdge = {
  __typename?: 'RelationshipNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<RelationshipNode>;
};

export enum RelationshipTypeEnum {
  Advocate = 'ADVOCATE',
  OtherGuardian = 'OTHER_GUARDIAN',
  OtherRelation = 'OTHER_RELATION',
  Parent = 'PARENT'
}

export type RequestEmailUpdateTokenMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

export type RequestEmailUpdateTokenMutationPayload = {
  __typename?: 'RequestEmailUpdateTokenMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  emailUpdateTokenRequested: Maybe<Scalars['Boolean']['output']>;
};

export type SendMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type SendMessageMutationPayload = {
  __typename?: 'SendMessageMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  message: Maybe<MessageNode>;
};

export type SetEnrolmentAttendanceMutationInput = {
  /** This field is required (but it can be null). */
  attended?: InputMaybe<Scalars['Boolean']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  enrolmentId: Scalars['ID']['input'];
};

export type SetEnrolmentAttendanceMutationPayload = {
  __typename?: 'SetEnrolmentAttendanceMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  enrolment: Maybe<EnrolmentNode>;
};

export type SubmitChildrenAndGuardianMutationInput = {
  /** At least one child is required. */
  children: Array<ChildInput>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  guardian: GuardianInput;
};

export type SubmitChildrenAndGuardianMutationPayload = {
  __typename?: 'SubmitChildrenAndGuardianMutationPayload';
  children: Maybe<Array<Maybe<ChildNode>>>;
  clientMutationId: Maybe<Scalars['String']['output']>;
  guardian: Maybe<GuardianNode>;
};

export type SubscribeToFreeSpotNotificationMutationInput = {
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  occurrenceId: Scalars['ID']['input'];
};

export type SubscribeToFreeSpotNotificationMutationPayload = {
  __typename?: 'SubscribeToFreeSpotNotificationMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
  occurrence: Maybe<OccurrenceNode>;
};

export enum TicketSystem {
  Internal = 'INTERNAL',
  Lippupiste = 'LIPPUPISTE',
  Ticketmaster = 'TICKETMASTER',
  Tixly = 'TIXLY'
}

export type TicketVerificationNode = {
  __typename?: 'TicketVerificationNode';
  /** Indicates whether the ticket holder has arrived. If null, the status is unset. */
  attended: Maybe<Scalars['Boolean']['output']>;
  /** The name of the event */
  eventName: Scalars['String']['output'];
  /**
   * **DEPRECATED:** Use `OccurrenceNode` instead (requires authorization). Provides a summary of arrivals for this occurrence. This field will be removed in a future release to protect sensitive attendance data.
   * @deprecated This field exposes potentially sensitive data and will be removed in a future release. The attendance information should not be publicly available.
   */
  occurrenceArrivalStatus: Maybe<OccurrenceArrivalStatusNode>;
  /** The time of the event occurrence */
  occurrenceTime: Scalars['DateTime']['output'];
  validity: Scalars['Boolean']['output'];
  /** The name of the venue */
  venueName: Maybe<Scalars['String']['output']>;
};

export type TicketmasterEnrolmentNode = Node & {
  __typename?: 'TicketmasterEnrolmentNode';
  createdAt: Scalars['DateTime']['output'];
  event: EventNode;
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type TicketmasterEventTicketSystem = EventTicketSystem & {
  __typename?: 'TicketmasterEventTicketSystem';
  childPassword: Maybe<Scalars['String']['output']>;
  endTime: Maybe<Scalars['DateTime']['output']>;
  freePasswordCount: Scalars['Int']['output'];
  type: TicketSystem;
  url: Scalars['String']['output'];
  usedPasswordCount: Scalars['Int']['output'];
};


export type TicketmasterEventTicketSystemChildPasswordArgs = {
  childId: InputMaybe<Scalars['ID']['input']>;
};

export type TicketmasterOccurrenceTicketSystem = OccurrenceTicketSystem & {
  __typename?: 'TicketmasterOccurrenceTicketSystem';
  type: TicketSystem;
  url: Scalars['String']['output'];
};

export type TixlyEnrolmentNode = Node & {
  __typename?: 'TixlyEnrolmentNode';
  createdAt: Scalars['DateTime']['output'];
  event: EventNode;
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type TixlyEventTicketSystem = EventTicketSystem & {
  __typename?: 'TixlyEventTicketSystem';
  childPassword: Maybe<Scalars['String']['output']>;
  endTime: Maybe<Scalars['DateTime']['output']>;
  freePasswordCount: Scalars['Int']['output'];
  type: TicketSystem;
  url: Scalars['String']['output'];
  usedPasswordCount: Scalars['Int']['output'];
};


export type TixlyEventTicketSystemChildPasswordArgs = {
  childId: InputMaybe<Scalars['ID']['input']>;
};

export type TixlyOccurrenceTicketSystem = OccurrenceTicketSystem & {
  __typename?: 'TixlyOccurrenceTicketSystem';
  type: TicketSystem;
  url: Scalars['String']['output'];
};

export type UnenrolOccurrenceMutationInput = {
  /** Guardian's child id */
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Occurrence id of event */
  occurrenceId: Scalars['ID']['input'];
};

export type UnenrolOccurrenceMutationPayload = {
  __typename?: 'UnenrolOccurrenceMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
  occurrence: Maybe<OccurrenceNode>;
};

export type UnsubscribeFromAllNotificationsMutationInput = {
  /** Auth token can be used to authorize the action without logging in as a user. */
  authToken?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/**
 * Unsubscribe user from all the notifications.
 *
 * NOTE: This mutation deletes the user's FreeSpotNotifications,
 * which are linked to a Child and Occurrence instances.
 * **It should be noted that the current model architecture allows
 * that a child can have multiple guardians, so unsubscribe can delete
 * some notifications from other users as well. However, the UI apps
 * has never allowed more than 1 guardian for a child.**
 */
export type UnsubscribeFromAllNotificationsMutationPayload = {
  __typename?: 'UnsubscribeFromAllNotificationsMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  guardian: Maybe<GuardianNode>;
  unsubscribed: Maybe<Scalars['Boolean']['output']>;
};

export type UnsubscribeFromFreeSpotNotificationMutationInput = {
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  occurrenceId: Scalars['ID']['input'];
};

export type UnsubscribeFromFreeSpotNotificationMutationPayload = {
  __typename?: 'UnsubscribeFromFreeSpotNotificationMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
  occurrence: Maybe<OccurrenceNode>;
};

export type UpdateChildMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  languagesSpokenAtHome?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  relationship?: InputMaybe<RelationshipInput>;
};

export type UpdateChildMutationPayload = {
  __typename?: 'UpdateChildMutationPayload';
  child: Maybe<ChildNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type UpdateChildNotesMutationInput = {
  childId: Scalars['ID']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  notes: Scalars['String']['input'];
};

export type UpdateChildNotesMutationPayload = {
  __typename?: 'UpdateChildNotesMutationPayload';
  childNotes: Maybe<ChildNotesNode>;
  clientMutationId: Maybe<Scalars['String']['output']>;
};

export type UpdateEventGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  translations?: InputMaybe<Array<InputMaybe<EventGroupTranslationsInput>>>;
};

export type UpdateEventGroupMutationPayload = {
  __typename?: 'UpdateEventGroupMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  eventGroup: Maybe<EventGroupNode>;
};

export type UpdateEventMutationInput = {
  capacityPerOccurrence?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  eventGroupId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
  participantsPerInvite?: InputMaybe<EventParticipantsPerInvite>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  readyForEventGroupPublishing?: InputMaybe<Scalars['Boolean']['input']>;
  ticketSystem?: InputMaybe<UpdateEventTicketSystemInput>;
  translations?: InputMaybe<Array<InputMaybe<EventTranslationsInput>>>;
};

export type UpdateEventMutationPayload = {
  __typename?: 'UpdateEventMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  event: Maybe<EventNode>;
};

export type UpdateEventTicketSystemInput = {
  endTime?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  occurrenceIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  protocol?: InputMaybe<ProtocolType>;
  /** Set the scope for message recipients. The 'ALL' is valid only when a user has a specific permission. */
  recipientSelection?: InputMaybe<RecipientSelectionEnum>;
  translations?: InputMaybe<Array<InputMaybe<MessageTranslationsInput>>>;
};

export type UpdateMessageMutationPayload = {
  __typename?: 'UpdateMessageMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  message: Maybe<MessageNode>;
};

export type UpdateMyCommunicationSubscriptionsMutationInput = {
  /** Auth token can be used to authorize the action without logging in as a user. */
  authToken?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hasAcceptedCommunication: Scalars['Boolean']['input'];
};

export type UpdateMyCommunicationSubscriptionsMutationPayload = {
  __typename?: 'UpdateMyCommunicationSubscriptionsMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  guardian: Maybe<GuardianCommunicationSubscriptionsNode>;
};

export type UpdateMyEmailMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  verificationToken: Scalars['String']['input'];
};

export type UpdateMyEmailMutationPayload = {
  __typename?: 'UpdateMyEmailMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  myProfile: Maybe<GuardianNode>;
};

export type UpdateMyProfileMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hasAcceptedCommunication?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Language>;
  languagesSpokenAtHome?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyProfileMutationPayload = {
  __typename?: 'UpdateMyProfileMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  myProfile: Maybe<GuardianNode>;
};

export type UpdateOccurrenceMutationInput = {
  capacityOverride?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  occurrenceLanguage?: InputMaybe<Language>;
  ticketSystem?: InputMaybe<OccurrenceTicketSystemInput>;
  time?: InputMaybe<Scalars['DateTime']['input']>;
  venueId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOccurrenceMutationPayload = {
  __typename?: 'UpdateOccurrenceMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  occurrence: Maybe<OccurrenceNode>;
};

export type UpdateTicketAttendedMutationInput = {
  attended: Scalars['Boolean']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  referenceId: Scalars['String']['input'];
};

export type UpdateTicketAttendedMutationPayload = {
  __typename?: 'UpdateTicketAttendedMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  ticket: Maybe<TicketVerificationNode>;
};

export type UpdateVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  projectId?: InputMaybe<Scalars['ID']['input']>;
  translations?: InputMaybe<Array<InputMaybe<VenueTranslationsInput>>>;
};

export type UpdateVenueMutationPayload = {
  __typename?: 'UpdateVenueMutationPayload';
  clientMutationId: Maybe<Scalars['String']['output']>;
  venue: Maybe<VenueNode>;
};

export type VenueNode = Node & {
  __typename?: 'VenueNode';
  accessibilityInfo: Maybe<Scalars['String']['output']>;
  additionalInfo: Maybe<Scalars['String']['output']>;
  address: Maybe<Scalars['String']['output']>;
  arrivalInstructions: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  /** The ID of the object */
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  occurrences: OccurrenceNodeConnection;
  project: ProjectNode;
  translations: Array<VenueTranslationType>;
  updatedAt: Scalars['DateTime']['output'];
  wcAndFacilities: Maybe<Scalars['String']['output']>;
  wwwUrl: Maybe<Scalars['String']['output']>;
};


export type VenueNodeOccurrencesArgs = {
  after: InputMaybe<Scalars['String']['input']>;
  before: InputMaybe<Scalars['String']['input']>;
  date: InputMaybe<Scalars['Date']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
  first: InputMaybe<Scalars['Int']['input']>;
  last: InputMaybe<Scalars['Int']['input']>;
  occurrenceLanguage: InputMaybe<Scalars['String']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  projectId: InputMaybe<Scalars['String']['input']>;
  time: InputMaybe<Scalars['Time']['input']>;
  upcoming: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithLeeway: InputMaybe<Scalars['Boolean']['input']>;
  upcomingWithOngoing: InputMaybe<Scalars['Boolean']['input']>;
  venueId: InputMaybe<Scalars['String']['input']>;
};

export type VenueNodeConnection = {
  __typename?: 'VenueNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VenueNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `VenueNode` and its cursor. */
export type VenueNodeEdge = {
  __typename?: 'VenueNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Maybe<VenueNode>;
};

export type VenueTranslationType = {
  __typename?: 'VenueTranslationType';
  accessibilityInfo: Scalars['String']['output'];
  additionalInfo: Scalars['String']['output'];
  address: Scalars['String']['output'];
  arrivalInstructions: Scalars['String']['output'];
  description: Scalars['String']['output'];
  languageCode: Language;
  name: Scalars['String']['output'];
  wcAndFacilities: Scalars['String']['output'];
  wwwUrl: Scalars['String']['output'];
};

export type VenueTranslationsInput = {
  accessibilityInfo?: InputMaybe<Scalars['String']['input']>;
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  arrivalInstructions?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
  name?: InputMaybe<Scalars['String']['input']>;
  wcAndFacilities?: InputMaybe<Scalars['String']['input']>;
  wwwUrl?: InputMaybe<Scalars['String']['input']>;
};

export type ChildrenQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['ID']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
}>;


export type ChildrenQuery = { __typename?: 'Query', children: { __typename?: 'ChildNodeConnection', count: number, edges: Array<{ __typename?: 'ChildNodeEdge', node: { __typename?: 'ChildNode', id: string, name: string, birthyear: number, postalCode: string, guardians: { __typename?: 'GuardianNodeConnection', edges: Array<{ __typename?: 'GuardianNodeEdge', node: { __typename?: 'GuardianNode', id: string, email: string, language: Language, firstName: string, lastName: string, phoneNumber: string } | null } | null> } } | null } | null> } | null };

export type ChildQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ChildQuery = { __typename?: 'Query', child: { __typename?: 'ChildNode', id: string, name: string, birthyear: number, postalCode: string, guardians: { __typename?: 'GuardianNodeConnection', edges: Array<{ __typename?: 'GuardianNodeEdge', node: { __typename?: 'GuardianNode', id: string, email: string, language: Language, firstName: string, lastName: string, phoneNumber: string } | null } | null> }, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, time: any, event: { __typename?: 'EventNode', id: string, duration: number | null }, venue: { __typename?: 'VenueNode', id: string } } | null } | null> } } | null };

export type ChildGuardianFragment = { __typename?: 'GuardianNode', id: string, email: string, language: Language, firstName: string, lastName: string, phoneNumber: string };

export type ChildOccurrenceFragment = { __typename?: 'OccurrenceNode', id: string, time: any, event: { __typename?: 'EventNode', id: string, duration: number | null }, venue: { __typename?: 'VenueNode', id: string } };

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', id: string, year: number, singleEventsAllowed: boolean, translations: Array<{ __typename?: 'ProjectTranslationType', languageCode: Language, name: string }> } | null };

export type AddEventGroupMutationVariables = Exact<{
  input: AddEventGroupMutationInput;
}>;


export type AddEventGroupMutation = { __typename?: 'Mutation', addEventGroup: { __typename?: 'AddEventGroupMutationPayload', eventGroup: { __typename?: 'EventGroupNode', id: string } | null } | null };

export type UpdateEventGroupMutationVariables = Exact<{
  input: UpdateEventGroupMutationInput;
}>;


export type UpdateEventGroupMutation = { __typename?: 'Mutation', updateEventGroup: { __typename?: 'UpdateEventGroupMutationPayload', eventGroup: { __typename?: 'EventGroupNode', id: string } | null } | null };

export type DeleteEventGroupMutationVariables = Exact<{
  input: DeleteEventGroupMutationInput;
}>;


export type DeleteEventGroupMutation = { __typename?: 'Mutation', deleteEventGroup: { __typename?: 'DeleteEventGroupMutationPayload', clientMutationId: string | null } | null };

export type PublishEventGroupMutationVariables = Exact<{
  input: PublishEventGroupMutationInput;
}>;


export type PublishEventGroupMutation = { __typename?: 'Mutation', publishEventGroup: { __typename?: 'PublishEventGroupMutationPayload', eventGroup: { __typename?: 'EventGroupNode', id: string, publishedAt: any | null } | null } | null };

export type EventGroupEventFragment = { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, readyForEventGroupPublishing: boolean, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, enrolmentCount: number, capacityOverride: number | null } | null } | null> } };

export type EventGroupQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventGroupQuery = { __typename?: 'Query', eventGroup: { __typename?: 'EventGroupNode', id: string, name: string | null, publishedAt: any | null, translations: Array<{ __typename?: 'EventGroupTranslationType', languageCode: Language, name: string, shortDescription: string, description: string }>, events: { __typename?: 'EventNodeConnection', edges: Array<{ __typename?: 'EventNodeEdge', node: { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, readyForEventGroupPublishing: boolean, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, enrolmentCount: number, capacityOverride: number | null } | null } | null> } } | null } | null> }, project: { __typename?: 'ProjectNode', id: string } } | null };

export type AddEventMutationVariables = Exact<{
  input: AddEventMutationInput;
}>;


export type AddEventMutation = { __typename?: 'Mutation', addEvent: { __typename?: 'AddEventMutationPayload', event: { __typename?: 'EventNode', id: string, image: string, participantsPerInvite: EventParticipantsPerInvite, capacityPerOccurrence: number | null, duration: number | null, ticketSystem: { __typename?: 'InternalEventTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TicketmasterEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TixlyEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | null, translations: Array<{ __typename?: 'EventTranslationType', languageCode: Language, name: string, imageAltText: string, description: string, shortDescription: string }> } | null } | null };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventMutationInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'UpdateEventMutationPayload', event: { __typename?: 'EventNode', id: string, image: string, participantsPerInvite: EventParticipantsPerInvite, capacityPerOccurrence: number | null, duration: number | null, readyForEventGroupPublishing: boolean, translations: Array<{ __typename?: 'EventTranslationType', imageAltText: string, languageCode: Language, name: string, description: string, shortDescription: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string } | null } | null> }, ticketSystem: { __typename?: 'InternalEventTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TicketmasterEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TixlyEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | null } | null } | null };

export type PublishEventMutationVariables = Exact<{
  input: PublishEventMutationInput;
}>;


export type PublishEventMutation = { __typename?: 'Mutation', publishEvent: { __typename?: 'PublishEventMutationPayload', event: { __typename?: 'EventNode', id: string, participantsPerInvite: EventParticipantsPerInvite, capacityPerOccurrence: number | null, duration: number | null, publishedAt: any | null, translations: Array<{ __typename?: 'EventTranslationType', languageCode: Language, name: string, description: string, shortDescription: string }> } | null } | null };

export type DeleteEventMutationVariables = Exact<{
  input: DeleteEventMutationInput;
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename?: 'DeleteEventMutationPayload', clientMutationId: string | null } | null };

export type EventsQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['ID']['input']>;
}>;


export type EventsQuery = { __typename?: 'Query', events: { __typename?: 'EventNodeConnection', edges: Array<{ __typename?: 'EventNodeEdge', node: { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, translations: Array<{ __typename?: 'EventTranslationType', languageCode: Language, name: string, imageAltText: string, description: string, shortDescription: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string } | null } | null> }, ticketSystem: { __typename?: 'InternalEventTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TicketmasterEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TixlyEventTicketSystem', url: string, endTime: any | null, type: TicketSystem } | null } | null } | null> } | null };

export type EventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, readyForEventGroupPublishing: boolean, translations: Array<{ __typename?: 'EventTranslationType', languageCode: Language, name: string, imageAltText: string, description: string, shortDescription: string }>, eventGroup: { __typename?: 'EventGroupNode', id: string, name: string | null } | null, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string } | null } | null> }, project: { __typename?: 'ProjectNode', id: string, myPermissions: { __typename?: 'ProjectPermissionsType', publish: boolean | null } | null }, ticketSystem: { __typename?: 'InternalEventTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteEventTicketSystem', usedPasswordCount: number, freePasswordCount: number, url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TicketmasterEventTicketSystem', usedPasswordCount: number, freePasswordCount: number, url: string, endTime: any | null, type: TicketSystem } | { __typename?: 'TixlyEventTicketSystem', usedPasswordCount: number, freePasswordCount: number, url: string, endTime: any | null, type: TicketSystem } | null } | null };

export type EventFragment = { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, capacityOverride: number | null } | null } | null> } };

export type EventsAndEventGroupsQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['ID']['input']>;
}>;


export type EventsAndEventGroupsQuery = { __typename?: 'Query', eventsAndEventGroups: { __typename?: 'EventOrEventGroupConnection', edges: Array<{ __typename?: 'EventOrEventGroupEdge', node: { __typename?: 'EventGroupNode', id: string, name: string | null, publishedAt: any | null, events: { __typename?: 'EventNodeConnection', edges: Array<{ __typename?: 'EventNodeEdge', node: { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, capacityOverride: number | null } | null } | null> } } | null } | null> } } | { __typename?: 'EventNode', id: string, name: string | null, image: string, participantsPerInvite: EventParticipantsPerInvite, duration: number | null, capacityPerOccurrence: number | null, publishedAt: any | null, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, capacityOverride: number | null } | null } | null> } } | null } | null> } | null };

export type AddMessageMutationVariables = Exact<{
  input: AddMessageMutationInput;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'AddMessageMutationPayload', message: { __typename?: 'MessageNode', id: string } | null } | null };

export type UpdateMessageMutationVariables = Exact<{
  input: UpdateMessageMutationInput;
}>;


export type UpdateMessageMutation = { __typename?: 'Mutation', updateMessage: { __typename?: 'UpdateMessageMutationPayload', message: { __typename?: 'MessageNode', id: string } | null } | null };

export type DeleteMessageMutationVariables = Exact<{
  input: DeleteMessageMutationInput;
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: { __typename?: 'DeleteMessageMutationPayload', clientMutationId: string | null } | null };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageMutationInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'SendMessageMutationPayload', message: { __typename?: 'MessageNode', id: string } | null } | null };

export type MessageFragment = { __typename?: 'MessageNode', id: string, subject: string | null, bodyText: string | null, recipientSelection: RecipientSelectionEnum | null, recipientCount: number | null, sentAt: any | null, protocol: MessagingMessageProtocolChoices, project: { __typename?: 'ProjectNode', id: string, year: number }, event: { __typename?: 'EventNode', id: string, name: string | null } | null, translations: Array<{ __typename?: 'MessageTranslationType', languageCode: MessagingMessageTranslationLanguageCodeChoices, subject: string, bodyText: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, time: any } | null } | null> } };

export type MessagesQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['ID']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  orderBy: InputMaybe<Scalars['String']['input']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessageNodeConnection', count: number, edges: Array<{ __typename?: 'MessageNodeEdge', node: { __typename?: 'MessageNode', id: string, subject: string | null, bodyText: string | null, recipientSelection: RecipientSelectionEnum | null, recipientCount: number | null, sentAt: any | null, protocol: MessagingMessageProtocolChoices, project: { __typename?: 'ProjectNode', id: string, year: number }, event: { __typename?: 'EventNode', id: string, name: string | null } | null, translations: Array<{ __typename?: 'MessageTranslationType', languageCode: MessagingMessageTranslationLanguageCodeChoices, subject: string, bodyText: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, time: any } | null } | null> } } | null } | null> } | null };

export type MessageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MessageQuery = { __typename?: 'Query', message: { __typename?: 'MessageNode', id: string, subject: string | null, bodyText: string | null, recipientSelection: RecipientSelectionEnum | null, recipientCount: number | null, sentAt: any | null, protocol: MessagingMessageProtocolChoices, project: { __typename?: 'ProjectNode', id: string, year: number }, event: { __typename?: 'EventNode', id: string, name: string | null } | null, translations: Array<{ __typename?: 'MessageTranslationType', languageCode: MessagingMessageTranslationLanguageCodeChoices, subject: string, bodyText: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, time: any } | null } | null> } } | null };

export type AddOccurrenceMutationVariables = Exact<{
  input: AddOccurrenceMutationInput;
}>;


export type AddOccurrenceMutation = { __typename?: 'Mutation', addOccurrence: { __typename?: 'AddOccurrenceMutationPayload', occurrence: { __typename?: 'OccurrenceNode', id: string, time: any, enrolmentCount: number, capacity: number | null, capacityOverride: number | null, event: { __typename?: 'EventNode', id: string, capacityPerOccurrence: number | null, duration: number | null }, venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string }> }, ticketSystem: { __typename?: 'InternalOccurrenceTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteOccurrenceTicketSystem', url: string, type: TicketSystem } | { __typename?: 'TicketmasterOccurrenceTicketSystem', url: string, type: TicketSystem } | { __typename?: 'TixlyOccurrenceTicketSystem', url: string, type: TicketSystem } | null } | null } | null };

export type UpdateOccurrenceMutationVariables = Exact<{
  input: UpdateOccurrenceMutationInput;
}>;


export type UpdateOccurrenceMutation = { __typename?: 'Mutation', updateOccurrence: { __typename?: 'UpdateOccurrenceMutationPayload', occurrence: { __typename?: 'OccurrenceNode', id: string, time: any, enrolmentCount: number, capacity: number | null, capacityOverride: number | null, event: { __typename?: 'EventNode', id: string, capacityPerOccurrence: number | null, duration: number | null }, venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string }> }, enrolments: { __typename?: 'EnrolmentNodeConnection', edges: Array<{ __typename?: 'EnrolmentNodeEdge', node: { __typename?: 'EnrolmentNode', id: string, attended: boolean | null, child: { __typename?: 'ChildNode', name: string, birthyear: number, guardians: { __typename?: 'GuardianNodeConnection', edges: Array<{ __typename?: 'GuardianNodeEdge', node: { __typename?: 'GuardianNode', id: string, email: string, firstName: string, lastName: string, language: Language } | null } | null> } } | null } | null } | null> }, ticketSystem: { __typename?: 'InternalOccurrenceTicketSystem', type: TicketSystem } | { __typename?: 'LippupisteOccurrenceTicketSystem', url: string, type: TicketSystem } | { __typename?: 'TicketmasterOccurrenceTicketSystem', url: string, type: TicketSystem } | { __typename?: 'TixlyOccurrenceTicketSystem', url: string, type: TicketSystem } | null } | null } | null };

export type DeleteOccurrenceMutationVariables = Exact<{
  input: DeleteOccurrenceMutationInput;
}>;


export type DeleteOccurrenceMutation = { __typename?: 'Mutation', deleteOccurrence: { __typename?: 'DeleteOccurrenceMutationPayload', clientMutationId: string | null } | null };

export type SetEnrolmentAttendanceMutationVariables = Exact<{
  input: SetEnrolmentAttendanceMutationInput;
}>;


export type SetEnrolmentAttendanceMutation = { __typename?: 'Mutation', setEnrolmentAttendance: { __typename?: 'SetEnrolmentAttendanceMutationPayload', enrolment: { __typename?: 'EnrolmentNode', id: string, attended: boolean | null } | null } | null };

export type OccurrencesQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['String']['input']>;
  eventId: InputMaybe<Scalars['String']['input']>;
}>;


export type OccurrencesQuery = { __typename?: 'Query', occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node: { __typename?: 'OccurrenceNode', id: string, time: any, enrolmentCount: number, capacity: number | null, capacityOverride: number | null, attendedEnrolmentCount: number, freeSpotNotificationSubscriptionCount: number, event: { __typename?: 'EventNode', duration: number | null, capacityPerOccurrence: number | null }, venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string }> } } | null } | null> } | null };

export type OccurrenceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OccurrenceQuery = { __typename?: 'Query', occurrence: { __typename?: 'OccurrenceNode', id: string, time: any, enrolmentCount: number, capacity: number | null, capacityOverride: number | null, event: { __typename?: 'EventNode', id: string, name: string | null, capacityPerOccurrence: number | null, duration: number | null, publishedAt: any | null, eventGroup: { __typename?: 'EventGroupNode', id: string, name: string | null } | null }, venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string }> }, enrolments: { __typename?: 'EnrolmentNodeConnection', edges: Array<{ __typename?: 'EnrolmentNodeEdge', node: { __typename?: 'EnrolmentNode', id: string, attended: boolean | null, child: { __typename?: 'ChildNode', id: string, name: string, birthyear: number, guardians: { __typename?: 'GuardianNodeConnection', edges: Array<{ __typename?: 'GuardianNodeEdge', node: { __typename?: 'GuardianNode', id: string, email: string, firstName: string, lastName: string, language: Language, phoneNumber: string } | null } | null> } } | null } | null } | null> }, freeSpotNotificationSubscriptions: { __typename?: 'FreeSpotNotificationSubscriptionNodeConnection', edges: Array<{ __typename?: 'FreeSpotNotificationSubscriptionNodeEdge', node: { __typename?: 'FreeSpotNotificationSubscriptionNode', id: string } | null } | null> } } | null };

export type MyAdminProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAdminProfileQuery = { __typename?: 'Query', myAdminProfile: { __typename?: 'AdminNode', id: string, projects: { __typename?: 'ProjectNodeConnection', edges: Array<{ __typename?: 'ProjectNodeEdge', node: { __typename?: 'ProjectNode', id: string, year: number, name: string | null, myPermissions: { __typename?: 'ProjectPermissionsType', publish: boolean | null, manageEventGroups: boolean | null, canSendToAllInProject: boolean | null } | null } | null } | null> } | null } | null };

export type ImportTicketSystemPasswordsMutationVariables = Exact<{
  input: ImportTicketSystemPasswordsMutationInput;
}>;


export type ImportTicketSystemPasswordsMutation = { __typename?: 'Mutation', importTicketSystemPasswords: { __typename?: 'ImportTicketSystemPasswordsMutationPayload', errors: Array<{ __typename?: 'ErrorType', field: string, message: string, value: string } | null> | null } | null };

export type UpdateTicketAttendedMutationVariables = Exact<{
  input: UpdateTicketAttendedMutationInput;
}>;


export type UpdateTicketAttendedMutation = { __typename?: 'Mutation', updateTicketAttended: { __typename?: 'UpdateTicketAttendedMutationPayload', ticket: { __typename?: 'TicketVerificationNode', occurrenceTime: any, eventName: string, venueName: string | null, validity: boolean, attended: boolean | null, occurrenceArrivalStatus: { __typename?: 'OccurrenceArrivalStatusNode', enrolmentCount: number, attendedEnrolmentCount: number } | null } | null } | null };

export type VerifyTicketQueryVariables = Exact<{
  referenceId: Scalars['String']['input'];
}>;


export type VerifyTicketQuery = { __typename?: 'Query', verifyTicket: { __typename?: 'TicketVerificationNode', occurrenceTime: any, eventName: string, venueName: string | null, validity: boolean, attended: boolean | null, occurrenceArrivalStatus: { __typename?: 'OccurrenceArrivalStatusNode', enrolmentCount: number, attendedEnrolmentCount: number } | null } | null };

export type AddVenueMutationVariables = Exact<{
  input: AddVenueMutationInput;
}>;


export type AddVenueMutation = { __typename?: 'Mutation', addVenue: { __typename?: 'AddVenueMutationPayload', venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', name: string, address: string, languageCode: Language, description: string, accessibilityInfo: string, arrivalInstructions: string, additionalInfo: string, wcAndFacilities: string }> } | null } | null };

export type UpdateVenueMutationVariables = Exact<{
  input: UpdateVenueMutationInput;
}>;


export type UpdateVenueMutation = { __typename?: 'Mutation', updateVenue: { __typename?: 'UpdateVenueMutationPayload', venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', name: string, address: string, languageCode: Language, description: string, accessibilityInfo: string, arrivalInstructions: string, additionalInfo: string, wcAndFacilities: string }> } | null } | null };

export type DeleteVenueMutationVariables = Exact<{
  input: DeleteVenueMutationInput;
}>;


export type DeleteVenueMutation = { __typename?: 'Mutation', deleteVenue: { __typename?: 'DeleteVenueMutationPayload', clientMutationId: string | null } | null };

export type VenuesQueryVariables = Exact<{
  projectId: InputMaybe<Scalars['ID']['input']>;
}>;


export type VenuesQuery = { __typename?: 'Query', venues: { __typename?: 'VenueNodeConnection', edges: Array<{ __typename?: 'VenueNodeEdge', node: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string, description: string, address: string, accessibilityInfo: string, arrivalInstructions: string, additionalInfo: string, wcAndFacilities: string, wwwUrl: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', pageInfo: { __typename?: 'PageInfo', startCursor: string | null } } } | null } | null> } | null };

export type VenueQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VenueQuery = { __typename?: 'Query', venue: { __typename?: 'VenueNode', id: string, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, name: string, description: string, address: string, accessibilityInfo: string, arrivalInstructions: string, additionalInfo: string, wcAndFacilities: string, wwwUrl: string }>, occurrences: { __typename?: 'OccurrenceNodeConnection', pageInfo: { __typename?: 'PageInfo', startCursor: string | null } } } | null };

export const ChildGuardianFragmentDoc = gql`
    fragment ChildGuardianFragment on GuardianNode {
  id
  email
  language
  firstName
  lastName
  phoneNumber
}
    `;
export const ChildOccurrenceFragmentDoc = gql`
    fragment ChildOccurrenceFragment on OccurrenceNode {
  id
  time
  event {
    id
    duration
  }
  venue {
    id
  }
}
    `;
export const EventGroupEventFragmentDoc = gql`
    fragment EventGroupEventFragment on EventNode {
  id
  name
  image
  participantsPerInvite
  duration
  capacityPerOccurrence
  publishedAt
  duration
  readyForEventGroupPublishing
  occurrences {
    edges {
      node {
        id
        enrolmentCount
        capacityOverride
      }
    }
  }
}
    `;
export const EventFragmentDoc = gql`
    fragment EventFragment on EventNode {
  id
  name
  image
  participantsPerInvite
  duration
  capacityPerOccurrence
  publishedAt
  duration
  occurrences {
    edges {
      node {
        id
        capacityOverride
      }
    }
  }
}
    `;
export const MessageFragmentDoc = gql`
    fragment MessageFragment on MessageNode {
  id
  subject
  bodyText
  recipientSelection
  recipientCount
  sentAt
  protocol
  project {
    id
    year
  }
  event {
    id
    name
  }
  translations {
    languageCode
    subject
    bodyText
  }
  occurrences {
    edges {
      node {
        id
        time
      }
    }
  }
}
    `;
export const ChildrenDocument = gql`
    query Children($projectId: ID, $limit: Int, $offset: Int) {
  children(projectId: $projectId, limit: $limit, offset: $offset) {
    count
    edges {
      node {
        id
        name
        birthyear
        postalCode
        guardians {
          edges {
            node {
              ...ChildGuardianFragment
            }
          }
        }
      }
    }
  }
}
    ${ChildGuardianFragmentDoc}`;
export type ChildrenQueryResult = Apollo.QueryResult<ChildrenQuery, ChildrenQueryVariables>;
export const ChildDocument = gql`
    query Child($id: ID!) {
  child(id: $id) {
    id
    name
    birthyear
    postalCode
    guardians {
      edges {
        node {
          ...ChildGuardianFragment
        }
      }
    }
    occurrences {
      edges {
        node {
          ...ChildOccurrenceFragment
        }
      }
    }
  }
}
    ${ChildGuardianFragmentDoc}
${ChildOccurrenceFragmentDoc}`;
export type ChildQueryResult = Apollo.QueryResult<ChildQuery, ChildQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: ID!) {
  project(id: $id) {
    id
    year
    singleEventsAllowed
    translations {
      languageCode
      name
    }
  }
}
    `;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const AddEventGroupDocument = gql`
    mutation addEventGroup($input: AddEventGroupMutationInput!) {
  addEventGroup(input: $input) {
    eventGroup {
      id
    }
  }
}
    `;
export type AddEventGroupMutationFn = Apollo.MutationFunction<AddEventGroupMutation, AddEventGroupMutationVariables>;
export type AddEventGroupMutationResult = Apollo.MutationResult<AddEventGroupMutation>;
export type AddEventGroupMutationOptions = Apollo.BaseMutationOptions<AddEventGroupMutation, AddEventGroupMutationVariables>;
export const UpdateEventGroupDocument = gql`
    mutation updateEventGroup($input: UpdateEventGroupMutationInput!) {
  updateEventGroup(input: $input) {
    eventGroup {
      id
    }
  }
}
    `;
export type UpdateEventGroupMutationFn = Apollo.MutationFunction<UpdateEventGroupMutation, UpdateEventGroupMutationVariables>;
export type UpdateEventGroupMutationResult = Apollo.MutationResult<UpdateEventGroupMutation>;
export type UpdateEventGroupMutationOptions = Apollo.BaseMutationOptions<UpdateEventGroupMutation, UpdateEventGroupMutationVariables>;
export const DeleteEventGroupDocument = gql`
    mutation deleteEventGroup($input: DeleteEventGroupMutationInput!) {
  deleteEventGroup(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteEventGroupMutationFn = Apollo.MutationFunction<DeleteEventGroupMutation, DeleteEventGroupMutationVariables>;
export type DeleteEventGroupMutationResult = Apollo.MutationResult<DeleteEventGroupMutation>;
export type DeleteEventGroupMutationOptions = Apollo.BaseMutationOptions<DeleteEventGroupMutation, DeleteEventGroupMutationVariables>;
export const PublishEventGroupDocument = gql`
    mutation publishEventGroup($input: PublishEventGroupMutationInput!) {
  publishEventGroup(input: $input) {
    eventGroup {
      id
      publishedAt
    }
  }
}
    `;
export type PublishEventGroupMutationFn = Apollo.MutationFunction<PublishEventGroupMutation, PublishEventGroupMutationVariables>;
export type PublishEventGroupMutationResult = Apollo.MutationResult<PublishEventGroupMutation>;
export type PublishEventGroupMutationOptions = Apollo.BaseMutationOptions<PublishEventGroupMutation, PublishEventGroupMutationVariables>;
export const EventGroupDocument = gql`
    query EventGroup($id: ID!) {
  eventGroup(id: $id) {
    id
    name
    publishedAt
    translations {
      languageCode
      name
      shortDescription
      description
    }
    events {
      edges {
        node {
          ...EventGroupEventFragment
        }
      }
    }
    project {
      id
    }
  }
}
    ${EventGroupEventFragmentDoc}`;
export type EventGroupQueryResult = Apollo.QueryResult<EventGroupQuery, EventGroupQueryVariables>;
export const AddEventDocument = gql`
    mutation AddEvent($input: AddEventMutationInput!) {
  addEvent(input: $input) {
    event {
      id
      image
      participantsPerInvite
      capacityPerOccurrence
      duration
      ticketSystem {
        type
        ... on TicketmasterEventTicketSystem {
          url
          endTime
        }
        ... on LippupisteEventTicketSystem {
          url
          endTime
        }
        ... on TixlyEventTicketSystem {
          url
          endTime
        }
      }
      translations {
        languageCode
        name
        imageAltText
        description
        shortDescription
      }
    }
  }
}
    `;
export type AddEventMutationFn = Apollo.MutationFunction<AddEventMutation, AddEventMutationVariables>;
export type AddEventMutationResult = Apollo.MutationResult<AddEventMutation>;
export type AddEventMutationOptions = Apollo.BaseMutationOptions<AddEventMutation, AddEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($input: UpdateEventMutationInput!) {
  updateEvent(input: $input) {
    event {
      id
      image
      participantsPerInvite
      capacityPerOccurrence
      duration
      readyForEventGroupPublishing
      translations {
        imageAltText
        languageCode
        name
        description
        shortDescription
      }
      occurrences {
        edges {
          node {
            id
          }
        }
      }
      ticketSystem {
        type
        ... on TicketmasterEventTicketSystem {
          url
          endTime
        }
        ... on LippupisteEventTicketSystem {
          url
          endTime
        }
        ... on TixlyEventTicketSystem {
          url
          endTime
        }
      }
    }
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const PublishEventDocument = gql`
    mutation PublishEvent($input: PublishEventMutationInput!) {
  publishEvent(input: $input) {
    event {
      id
      participantsPerInvite
      capacityPerOccurrence
      duration
      publishedAt
      translations {
        languageCode
        name
        description
        shortDescription
      }
    }
  }
}
    `;
export type PublishEventMutationFn = Apollo.MutationFunction<PublishEventMutation, PublishEventMutationVariables>;
export type PublishEventMutationResult = Apollo.MutationResult<PublishEventMutation>;
export type PublishEventMutationOptions = Apollo.BaseMutationOptions<PublishEventMutation, PublishEventMutationVariables>;
export const DeleteEventDocument = gql`
    mutation deleteEvent($input: DeleteEventMutationInput!) {
  deleteEvent(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const EventsDocument = gql`
    query Events($projectId: ID) {
  events(projectId: $projectId) {
    edges {
      node {
        id
        name
        image
        participantsPerInvite
        duration
        translations {
          languageCode
          name
          imageAltText
          description
          shortDescription
        }
        capacityPerOccurrence
        publishedAt
        occurrences {
          edges {
            node {
              id
            }
          }
        }
        ticketSystem {
          type
          ... on TicketmasterEventTicketSystem {
            url
            endTime
          }
          ... on LippupisteEventTicketSystem {
            url
            endTime
          }
          ... on TixlyEventTicketSystem {
            url
            endTime
          }
        }
      }
    }
  }
}
    `;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const EventDocument = gql`
    query Event($id: ID!) {
  event(id: $id) {
    id
    name
    image
    participantsPerInvite
    duration
    translations {
      languageCode
      name
      imageAltText
      description
      shortDescription
    }
    capacityPerOccurrence
    publishedAt
    readyForEventGroupPublishing
    eventGroup {
      id
      name
    }
    occurrences {
      edges {
        node {
          id
        }
      }
    }
    project {
      id
      myPermissions {
        publish
      }
    }
    ticketSystem {
      type
      ... on TicketmasterEventTicketSystem {
        usedPasswordCount
        freePasswordCount
        url
        endTime
      }
      ... on LippupisteEventTicketSystem {
        usedPasswordCount
        freePasswordCount
        url
        endTime
      }
      ... on TixlyEventTicketSystem {
        usedPasswordCount
        freePasswordCount
        url
        endTime
      }
    }
  }
}
    `;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventsAndEventGroupsDocument = gql`
    query EventsAndEventGroups($projectId: ID) {
  eventsAndEventGroups(projectId: $projectId) {
    edges {
      node {
        ... on EventNode {
          ...EventFragment
        }
        ... on EventGroupNode {
          id
          name
          publishedAt
          events {
            edges {
              node {
                ...EventFragment
              }
            }
          }
        }
      }
    }
  }
}
    ${EventFragmentDoc}`;
export type EventsAndEventGroupsQueryResult = Apollo.QueryResult<EventsAndEventGroupsQuery, EventsAndEventGroupsQueryVariables>;
export const AddMessageDocument = gql`
    mutation AddMessage($input: AddMessageMutationInput!) {
  addMessage(input: $input) {
    message {
      id
    }
  }
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($input: UpdateMessageMutationInput!) {
  updateMessage(input: $input) {
    message {
      id
    }
  }
}
    `;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($input: DeleteMessageMutationInput!) {
  deleteMessage(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: SendMessageMutationInput!) {
  sendMessage(input: $input) {
    message {
      id
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const MessagesDocument = gql`
    query Messages($projectId: ID, $limit: Int, $offset: Int, $orderBy: String) {
  messages(
    projectId: $projectId
    limit: $limit
    offset: $offset
    orderBy: $orderBy
  ) {
    count
    edges {
      node {
        ...MessageFragment
      }
    }
  }
}
    ${MessageFragmentDoc}`;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const MessageDocument = gql`
    query Message($id: ID!) {
  message(id: $id) {
    ...MessageFragment
  }
}
    ${MessageFragmentDoc}`;
export type MessageQueryResult = Apollo.QueryResult<MessageQuery, MessageQueryVariables>;
export const AddOccurrenceDocument = gql`
    mutation addOccurrence($input: AddOccurrenceMutationInput!) {
  addOccurrence(input: $input) {
    occurrence {
      id
      time
      event {
        id
        capacityPerOccurrence
        duration
      }
      enrolmentCount
      venue {
        id
        translations {
          languageCode
          name
        }
      }
      capacity
      capacityOverride
      ticketSystem {
        type
        ... on TicketmasterOccurrenceTicketSystem {
          url
        }
        ... on LippupisteOccurrenceTicketSystem {
          url
        }
        ... on TixlyOccurrenceTicketSystem {
          url
        }
      }
    }
  }
}
    `;
export type AddOccurrenceMutationFn = Apollo.MutationFunction<AddOccurrenceMutation, AddOccurrenceMutationVariables>;
export type AddOccurrenceMutationResult = Apollo.MutationResult<AddOccurrenceMutation>;
export type AddOccurrenceMutationOptions = Apollo.BaseMutationOptions<AddOccurrenceMutation, AddOccurrenceMutationVariables>;
export const UpdateOccurrenceDocument = gql`
    mutation updateOccurrence($input: UpdateOccurrenceMutationInput!) {
  updateOccurrence(input: $input) {
    occurrence {
      id
      time
      event {
        id
        capacityPerOccurrence
        duration
      }
      enrolmentCount
      venue {
        id
        translations {
          languageCode
          name
        }
      }
      capacity
      capacityOverride
      enrolments {
        edges {
          node {
            id
            attended
            child {
              name
              birthyear
              guardians {
                edges {
                  node {
                    id
                    email
                    firstName
                    lastName
                    language
                  }
                }
              }
            }
          }
        }
      }
      ticketSystem {
        type
        ... on TicketmasterOccurrenceTicketSystem {
          url
        }
        ... on LippupisteOccurrenceTicketSystem {
          url
        }
        ... on TixlyOccurrenceTicketSystem {
          url
        }
      }
    }
  }
}
    `;
export type UpdateOccurrenceMutationFn = Apollo.MutationFunction<UpdateOccurrenceMutation, UpdateOccurrenceMutationVariables>;
export type UpdateOccurrenceMutationResult = Apollo.MutationResult<UpdateOccurrenceMutation>;
export type UpdateOccurrenceMutationOptions = Apollo.BaseMutationOptions<UpdateOccurrenceMutation, UpdateOccurrenceMutationVariables>;
export const DeleteOccurrenceDocument = gql`
    mutation deleteOccurrence($input: DeleteOccurrenceMutationInput!) {
  deleteOccurrence(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteOccurrenceMutationFn = Apollo.MutationFunction<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export type DeleteOccurrenceMutationResult = Apollo.MutationResult<DeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationOptions = Apollo.BaseMutationOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export const SetEnrolmentAttendanceDocument = gql`
    mutation setEnrolmentAttendance($input: SetEnrolmentAttendanceMutationInput!) {
  setEnrolmentAttendance(input: $input) {
    enrolment {
      id
      attended
    }
  }
}
    `;
export type SetEnrolmentAttendanceMutationFn = Apollo.MutationFunction<SetEnrolmentAttendanceMutation, SetEnrolmentAttendanceMutationVariables>;
export type SetEnrolmentAttendanceMutationResult = Apollo.MutationResult<SetEnrolmentAttendanceMutation>;
export type SetEnrolmentAttendanceMutationOptions = Apollo.BaseMutationOptions<SetEnrolmentAttendanceMutation, SetEnrolmentAttendanceMutationVariables>;
export const OccurrencesDocument = gql`
    query Occurrences($projectId: String, $eventId: String) {
  occurrences(projectId: $projectId, eventId: $eventId) {
    edges {
      node {
        id
        time
        event {
          duration
          capacityPerOccurrence
        }
        enrolmentCount
        capacity
        capacityOverride
        venue {
          id
          translations {
            languageCode
            name
          }
        }
        attendedEnrolmentCount
        freeSpotNotificationSubscriptionCount
      }
    }
  }
}
    `;
export type OccurrencesQueryResult = Apollo.QueryResult<OccurrencesQuery, OccurrencesQueryVariables>;
export const OccurrenceDocument = gql`
    query Occurrence($id: ID!) {
  occurrence(id: $id) {
    id
    time
    event {
      id
      name
      capacityPerOccurrence
      duration
      publishedAt
      eventGroup {
        id
        name
      }
    }
    enrolmentCount
    capacity
    capacityOverride
    venue {
      id
      translations {
        languageCode
        name
      }
    }
    enrolments {
      edges {
        node {
          id
          attended
          child {
            id
            name
            birthyear
            guardians {
              edges {
                node {
                  id
                  email
                  firstName
                  lastName
                  language
                  phoneNumber
                }
              }
            }
          }
        }
      }
    }
    freeSpotNotificationSubscriptions {
      edges {
        node {
          id
        }
      }
    }
  }
}
    `;
export type OccurrenceQueryResult = Apollo.QueryResult<OccurrenceQuery, OccurrenceQueryVariables>;
export const MyAdminProfileDocument = gql`
    query MyAdminProfile {
  myAdminProfile {
    id
    projects {
      edges {
        node {
          id
          year
          name
          myPermissions {
            publish
            manageEventGroups
            canSendToAllInProject
          }
        }
      }
    }
  }
}
    `;
export type MyAdminProfileQueryResult = Apollo.QueryResult<MyAdminProfileQuery, MyAdminProfileQueryVariables>;
export const ImportTicketSystemPasswordsMutationDocument = gql`
    mutation ImportTicketSystemPasswordsMutation($input: ImportTicketSystemPasswordsMutationInput!) {
  importTicketSystemPasswords(input: $input) {
    errors {
      field
      message
      value
    }
  }
}
    `;
export type ImportTicketSystemPasswordsMutationMutationFn = Apollo.MutationFunction<ImportTicketSystemPasswordsMutation, ImportTicketSystemPasswordsMutationVariables>;
export type ImportTicketSystemPasswordsMutationMutationResult = Apollo.MutationResult<ImportTicketSystemPasswordsMutation>;
export type ImportTicketSystemPasswordsMutationMutationOptions = Apollo.BaseMutationOptions<ImportTicketSystemPasswordsMutation, ImportTicketSystemPasswordsMutationVariables>;
export const UpdateTicketAttendedDocument = gql`
    mutation UpdateTicketAttended($input: UpdateTicketAttendedMutationInput!) {
  updateTicketAttended(input: $input) {
    ticket {
      occurrenceTime
      eventName
      venueName
      validity
      attended
      occurrenceArrivalStatus {
        enrolmentCount
        attendedEnrolmentCount
      }
    }
  }
}
    `;
export type UpdateTicketAttendedMutationFn = Apollo.MutationFunction<UpdateTicketAttendedMutation, UpdateTicketAttendedMutationVariables>;
export type UpdateTicketAttendedMutationResult = Apollo.MutationResult<UpdateTicketAttendedMutation>;
export type UpdateTicketAttendedMutationOptions = Apollo.BaseMutationOptions<UpdateTicketAttendedMutation, UpdateTicketAttendedMutationVariables>;
export const VerifyTicketDocument = gql`
    query VerifyTicket($referenceId: String!) {
  verifyTicket(referenceId: $referenceId) {
    occurrenceTime
    eventName
    venueName
    validity
    attended
    occurrenceArrivalStatus {
      enrolmentCount
      attendedEnrolmentCount
    }
  }
}
    `;
export type VerifyTicketQueryResult = Apollo.QueryResult<VerifyTicketQuery, VerifyTicketQueryVariables>;
export const AddVenueDocument = gql`
    mutation addVenue($input: AddVenueMutationInput!) {
  addVenue(input: $input) {
    venue {
      id
      translations {
        name
        address
        languageCode
        description
        accessibilityInfo
        arrivalInstructions
        additionalInfo
        wcAndFacilities
      }
    }
  }
}
    `;
export type AddVenueMutationFn = Apollo.MutationFunction<AddVenueMutation, AddVenueMutationVariables>;
export type AddVenueMutationResult = Apollo.MutationResult<AddVenueMutation>;
export type AddVenueMutationOptions = Apollo.BaseMutationOptions<AddVenueMutation, AddVenueMutationVariables>;
export const UpdateVenueDocument = gql`
    mutation updateVenue($input: UpdateVenueMutationInput!) {
  updateVenue(input: $input) {
    venue {
      id
      translations {
        name
        address
        languageCode
        description
        accessibilityInfo
        arrivalInstructions
        additionalInfo
        wcAndFacilities
      }
    }
  }
}
    `;
export type UpdateVenueMutationFn = Apollo.MutationFunction<UpdateVenueMutation, UpdateVenueMutationVariables>;
export type UpdateVenueMutationResult = Apollo.MutationResult<UpdateVenueMutation>;
export type UpdateVenueMutationOptions = Apollo.BaseMutationOptions<UpdateVenueMutation, UpdateVenueMutationVariables>;
export const DeleteVenueDocument = gql`
    mutation deleteVenue($input: DeleteVenueMutationInput!) {
  deleteVenue(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteVenueMutationFn = Apollo.MutationFunction<DeleteVenueMutation, DeleteVenueMutationVariables>;
export type DeleteVenueMutationResult = Apollo.MutationResult<DeleteVenueMutation>;
export type DeleteVenueMutationOptions = Apollo.BaseMutationOptions<DeleteVenueMutation, DeleteVenueMutationVariables>;
export const VenuesDocument = gql`
    query Venues($projectId: ID) {
  venues(projectId: $projectId) {
    edges {
      node {
        id
        translations {
          languageCode
          name
          description
          address
          accessibilityInfo
          arrivalInstructions
          additionalInfo
          wcAndFacilities
          wwwUrl
        }
        occurrences {
          pageInfo {
            startCursor
          }
        }
      }
    }
  }
}
    `;
export type VenuesQueryResult = Apollo.QueryResult<VenuesQuery, VenuesQueryVariables>;
export const VenueDocument = gql`
    query Venue($id: ID!) {
  venue(id: $id) {
    id
    translations {
      languageCode
      name
      description
      address
      accessibilityInfo
      arrivalInstructions
      additionalInfo
      wcAndFacilities
      wwwUrl
    }
    occurrences {
      pageInfo {
        startCursor
      }
    }
  }
}
    `;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;