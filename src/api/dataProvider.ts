import {
  CreateResult,
  DataProvider,
  DeleteManyResult,
  DeleteResult,
  GetListResult,
  GetManyReferenceResult,
  GetManyResult,
  GetOneResult,
  UpdateManyResult,
  UpdateResult,
} from 'react-admin';

import {
  getVenues,
  getVenue,
  addVenue,
  updateVenue,
  deleteVenue,
} from '../domain/venues/api/VenueApi';
import {
  MethodHandlers,
  Method,
  Resource,
  DataProviderParams as Params,
  MethodHandler,
  MethodHandlerResponse,
} from './types';
import {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
  setReady,
} from '../domain/events/api/EventApi';
import {
  addOccurrence,
  getOccurrences,
  getOccurrence,
  updateOccurrence,
  deleteOccurrence,
  setEnrolmentAttendance,
  getOccurrencesManyReference,
} from '../domain/occurrences/api/OccurrenceApi';
import { getChild, getChildren } from '../domain/children/api/ChildApi';
import { getMyAdminProfile } from '../domain/profile/api';
import { getProject } from '../domain/dashboard/api';
import MessagesApi from '../domain/messages/api/messagesApi';
import EventGroupsApi from '../domain/eventGroups/api/eventGroupsApi';
import EventsAndEventGroupsApi from '../domain/eventsAndEventGroups/api/eventsAndEventGroupsApi';
import { AdminEvent } from '../domain/events/types/EventTypes';
import { EventGroup_eventGroup } from './generatedTypes/EventGroup';
import { Message_message } from './generatedTypes/Message';

const METHOD_HANDLERS: MethodHandlers = {
  venues: {
    LIST: getVenues,
    ONE: getVenue,
    MANY: getVenues,
    CREATE: addVenue,
    UPDATE: updateVenue,
    DELETE: deleteVenue,
  },
  events: {
    LIST: getEvents,
    ONE: getEvent,
    MANY: getEvents,
    CREATE: addEvent,
    UPDATE: updateEvent,
    DELETE: deleteEvent,
    PUBLISH: publishEvent,
    SET_READY: setReady,
  },
  occurrences: {
    LIST: getOccurrences,
    ONE: getOccurrence,
    MANY: getOccurrences,
    CREATE: addOccurrence,
    UPDATE: updateOccurrence,
    DELETE: deleteOccurrence,
    MANY_REFERENCE: getOccurrencesManyReference,
  },
  children: {
    LIST: getChildren,
    ONE: getChild,
    MANY_REFERENCE: getChildren,
  },
  projects: {
    ONE: getProject,
  },
  messages: {
    LIST: MessagesApi.getMessages,
    ONE: MessagesApi.getMessage,
    MANY: MessagesApi.getMessages,
    CREATE: MessagesApi.addMessage,
    UPDATE: MessagesApi.updateMessage,
    DELETE: MessagesApi.deleteMessage,
    SEND: MessagesApi.sendMessage,
  } as Record<string, MethodHandler>,
  'event-groups': {
    ONE: EventGroupsApi.getEventGroup,
    CREATE: EventGroupsApi.addEventGroup,
    UPDATE: EventGroupsApi.updateEventGroup,
    DELETE: EventGroupsApi.deleteEventGroup,
    PUBLISH: EventGroupsApi.publishEventGroup,
  } as Record<string, MethodHandler>,
  'events-and-event-groups': {
    LIST: EventsAndEventGroupsApi.getEventsAndEventGroups,
  },
};

const runHandler = async (
  method: Method,
  resource: Resource,
  params: Params
) => {
  const handlers = METHOD_HANDLERS[resource];
  if (!handlers) {
    throw new Error(`Invalid resource "${resource}".`);
  }

  const handler = handlers[method];
  if (!handler) {
    throw new Error(
      `Method "${method}" for resource "${resource}" is not implemented.`
    );
  }

  if (['LIST', 'MANY_REFERENCE'].includes(method)) {
    params.pagination.limit = params.pagination.perPage;
    params.pagination.offset =
      params.pagination.perPage * (params.pagination.page - 1);
  }

  return handler(params);
};

// FIXME: In version 3.9.0 typescript support was added into
// react-admin and our implementation of dataProvider is not type
// compatible.
const baseDataProvider = {
  getList: async (resource: Resource, params: Params) =>
    runHandler('LIST', resource, params) as Promise<GetListResult>,
  getOne: async (resource: Resource, params: Params) =>
    runHandler('ONE', resource, params) as Promise<GetOneResult>,
  getMany: async (resource: Resource, params: Params) =>
    runHandler('MANY', resource, params) as Promise<GetManyResult>,
  getManyReference: async (resource: Resource, params: Params) =>
    runHandler(
      'MANY_REFERENCE',
      resource,
      params
    ) as Promise<GetManyReferenceResult>,
  create: async (resource: Resource, params: Params) =>
    runHandler('CREATE', resource, params) as Promise<CreateResult>,
  update: async (resource: Resource, params: Params) =>
    runHandler('UPDATE', resource, params) as Promise<UpdateResult>,
  updateMany: (resource: Resource, params: Params) =>
    runHandler('UPDATE_MANY', resource, params) as Promise<UpdateManyResult>,
  delete: async (resource: Resource, params: Params) =>
    runHandler('DELETE', resource, params) as Promise<DeleteResult>,
  deleteMany: async (resource: Resource, params: Params) =>
    runHandler('DELETE_MANY', resource, params) as Promise<DeleteManyResult>,
} as const satisfies DataProvider<Resource> | DataProvider;

const extendedDataProvider = {
  ...baseDataProvider,
  publish: async (
    resource: 'events' | 'event-groups',
    params: { id: string }
  ) =>
    runHandler('PUBLISH', resource, params) as Promise<
      MethodHandlerResponse<AdminEvent | EventGroup_eventGroup | null>
    >,
  send: async (resource: 'messages', params: { id: string }) =>
    runHandler('SEND', resource, params) as Promise<
      MethodHandlerResponse<Message_message | null>
    >,
  getMyAdminProfile,
  setEnrolmentAttendance,
  setReady: async (
    resource: 'events',
    params: { id: string; readyForEventGroupPublishing: boolean }
  ) =>
    runHandler('SET_READY', resource, params) as Promise<
      MethodHandlerResponse<AdminEvent | null>
    >,
} as const satisfies DataProvider<Resource> | DataProvider;

export default extendedDataProvider;
