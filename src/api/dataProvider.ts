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
import { addRefreshAuthToDataProvider } from 'react-admin';

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
import type { AdminEvent } from '../domain/events/types/EventTypes';
import type {
  EventGroupNode,
  MessageNode,
} from '../domain/api/generatedTypes/graphql';
import { refreshAuth } from '../domain/authentication/refreshAuth';

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

const runHandler = <T>(method: Method, resource: Resource, params: Params) => {
  const handler = getMethodHandler(resource, method);
  if (['LIST', 'MANY_REFERENCE'].includes(method)) {
    extendPaginationParams(params);
  }
  return handler(params) as Promise<T>;
};

const baseDataProvider = {
  getList: (resource: Resource, params: Params) =>
    runHandler<GetListResult>('LIST', resource, params),
  getOne: (resource: Resource, params: Params) =>
    runHandler<GetOneResult>('ONE', resource, params),
  getMany: (resource: Resource, params: Params) =>
    runHandler<GetManyResult>('MANY', resource, params),
  getManyReference: (resource: Resource, params: Params) =>
    runHandler<GetManyReferenceResult>('MANY_REFERENCE', resource, params),
  create: (resource: Resource, params: Params) =>
    runHandler<CreateResult>('CREATE', resource, params),
  update: (resource: Resource, params: Params) =>
    runHandler<UpdateResult>('UPDATE', resource, params),
  updateMany: (resource: Resource, params: Params) =>
    runHandler<UpdateManyResult>('UPDATE_MANY', resource, params),
  delete: (resource: Resource, params: Params) =>
    runHandler<DeleteResult>('DELETE', resource, params),
  deleteMany: (resource: Resource, params: Params) =>
    runHandler<DeleteManyResult>('DELETE_MANY', resource, params),
} as const satisfies DataProvider<Resource>;

const extendedDataProvider = {
  ...baseDataProvider,
  publish: (resource: 'events' | 'event-groups', params: { id: string }) =>
    runHandler<MethodHandlerResponse<AdminEvent | EventGroupNode | null>>(
      'PUBLISH',
      resource,
      params
    ),
  send: (resource: 'messages', params: { id: string }) =>
    runHandler<MethodHandlerResponse<MessageNode | null>>(
      'SEND',
      resource,
      params
    ),
  getMyAdminProfile,
  setEnrolmentAttendance,
  setReady: (
    resource: 'events',
    params: { id: string; readyForEventGroupPublishing: boolean }
  ) =>
    runHandler<MethodHandlerResponse<AdminEvent | null>>(
      'SET_READY',
      resource,
      params
    ),
} as const satisfies DataProvider<Resource>;

// Rationale for using type casts:
///
// Type casts because addRefreshAuthToDataProvider does not support the
// generic DataProvider<T> type, and also because we're using e.g.
// Parameters<(typeof extendedDataProvider)['send']>[1] elsewhere and those
// need specific types for DataProvider's generic functions. The functions'
// types are not known simply based on DataProvider's generic type T parameter.
const extendedDataProviderWithRefreshAuth = addRefreshAuthToDataProvider(
  extendedDataProvider as DataProvider,
  refreshAuth
) as typeof extendedDataProvider;

// Expose the dataProvider before wrapping it with the proxy for testing,
// as the proxy makes it difficult to mock the dataProvider's methods directly.
export { extendedDataProvider as dataProviderBeforeWrappingWithProxy };

export default extendedDataProviderWithRefreshAuth;
