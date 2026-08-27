import type {
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
import type {
  MethodHandlers,
  Method,
  Resource,
  DataProviderParams as Params,
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
import type { AdminEvent } from '../domain/events/types/EventTypes';
import type {
  EventGroupNode,
  MessageNode,
} from '../domain/api/generatedTypes/graphql';

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
  },
  'event-groups': {
    ONE: EventGroupsApi.getEventGroup,
    CREATE: EventGroupsApi.addEventGroup,
    UPDATE: EventGroupsApi.updateEventGroup,
    DELETE: EventGroupsApi.deleteEventGroup,
    PUBLISH: EventGroupsApi.publishEventGroup,
  },
  'events-and-event-groups': {
    LIST: EventsAndEventGroupsApi.getEventsAndEventGroups,
  },
};

const getResourceHandlers = (resource: Resource) => {
  const handlers = METHOD_HANDLERS[resource];
  if (!handlers) {
    throw new Error(`Invalid resource "${resource}".`);
  }
  return handlers;
};

const getMethodHandler = (resource: Resource, method: Method) => {
  const handler = getResourceHandlers(resource)[method];
  if (!handler) {
    throw new Error(
      `Method "${method}" for resource "${resource}" is not implemented.`
    );
  }
  return handler;
};

const extendPaginationParams = (params: Params) => {
  params.pagination.limit = params.pagination.perPage;
  params.pagination.offset =
    params.pagination.perPage * (params.pagination.page - 1);
};

const runHandler = async <T>(
  method: Method,
  resource: Resource,
  params: Params
) => {
  const handler = getMethodHandler(resource, method);
  if (['LIST', 'MANY_REFERENCE'].includes(method)) {
    extendPaginationParams(params);
  }
  return await (handler(params) as Promise<T>);
};

// FIXME: our dataProvider is not fully type compatible with react-admin's own
// types (added in react-admin 3.9.0). Still true on 5.x — it compiles only via
// escape hatches: `Params` is `Record<string, any>` and `runHandler` casts with
// `as Promise<T>`, so neither params nor results are actually checked. A real
// fix means typing the handler registry so (resource, method) determines both.
//
// Until then, don't "simplify" `Resource[number]` (which resolves to plain
// `string`) to `Resource`, or drop the `as Resource` casts: the five
// `useDataProvider<typeof extendedDataProvider>()` call sites constrain against
// `DataProvider`, whose default `ResourceType` is `string`, so narrowing here
// fails them with TS2344.
const baseDataProvider = {
  getList: async (resource: Resource[number], params: Params) =>
    await runHandler<GetListResult>('LIST', resource as Resource, params),
  getOne: async (resource: Resource[number], params: Params) =>
    await runHandler<GetOneResult>('ONE', resource as Resource, params),
  getMany: async (resource: Resource[number], params: Params) =>
    await runHandler<GetManyResult>('MANY', resource as Resource, params),
  getManyReference: async (resource: Resource[number], params: Params) =>
    await runHandler<GetManyReferenceResult>(
      'MANY_REFERENCE',
      resource as Resource,
      params
    ),
  create: async (resource: Resource[number], params: Params) =>
    await runHandler<CreateResult>('CREATE', resource as Resource, params),
  update: async (resource: Resource[number], params: Params) =>
    await runHandler<UpdateResult>('UPDATE', resource as Resource, params),
  updateMany: async (resource: Resource[number], params: Params) =>
    await runHandler<UpdateManyResult>(
      'UPDATE_MANY',
      resource as Resource,
      params
    ),
  delete: async (resource: Resource[number], params: Params) =>
    await runHandler<DeleteResult>('DELETE', resource as Resource, params),
  deleteMany: async (resource: Resource[number], params: Params) =>
    await runHandler<DeleteManyResult>(
      'DELETE_MANY',
      resource as Resource,
      params
    ),
} as const satisfies DataProvider<Resource>;

const extendedDataProvider = {
  ...baseDataProvider,
  publish: async (
    resource: Extract<Resource, 'events' | 'event-groups'>,
    params: { id: string }
  ) =>
    await runHandler<MethodHandlerResponse<AdminEvent | EventGroupNode | null>>(
      'PUBLISH',
      resource,
      params
    ),
  send: async (
    resource: Extract<Resource, 'messages'>,
    params: { id: string }
  ) =>
    await runHandler<MethodHandlerResponse<MessageNode | null>>(
      'SEND',
      resource,
      params
    ),
  getMyAdminProfile,
  setEnrolmentAttendance,
  setReady: async (
    resource: Extract<Resource, 'events'>,
    params: { id: string; readyForEventGroupPublishing: boolean }
  ) =>
    await runHandler<MethodHandlerResponse<AdminEvent | null>>(
      'SET_READY',
      resource,
      params
    ),
} as const satisfies DataProvider<Resource>;

export default extendedDataProvider;
