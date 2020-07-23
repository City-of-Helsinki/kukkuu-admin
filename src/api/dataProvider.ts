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
} from './types';
import {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
} from '../domain/events/api/EventApi';
import {
  addOccurrence,
  getOccurrences,
  getOccurrence,
  updateOccurrence,
  deleteOccurrence,
  setEnrolmentAttendance,
} from '../domain/occurrences/api/OccurrenceApi';
import { getChild, getChildren } from '../domain/children/api/ChildApi';
import { getMyAdminProfile } from '../domain/profile/api';
import { getProject } from '../domain/dashboard/api';

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
  },
  occurrences: {
    LIST: getEvents,
    ONE: getOccurrence,
    CREATE: addOccurrence,
    UPDATE: updateOccurrence,
    DELETE: deleteOccurrence,
    MANY_REFERENCE: getOccurrences,
  },
  children: {
    LIST: getChildren,
    ONE: getChild,
    MANY_REFERENCE: getChildren,
  },
  projects: {
    ONE: getProject,
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

const dataProvider = {
  getList: async (resource: Resource, params: Params) =>
    runHandler('LIST', resource, params),
  getOne: async (resource: Resource, params: Params) =>
    runHandler('ONE', resource, params),
  getMany: async (resource: Resource, params: Params) =>
    runHandler('MANY', resource, params),
  getManyReference: async (resource: Resource, params: Params) =>
    runHandler('MANY_REFERENCE', resource, params),
  create: async (resource: Resource, params: Params) =>
    runHandler('CREATE', resource, params),
  update: async (resource: Resource, params: Params) =>
    runHandler('UPDATE', resource, params),
  delete: async (resource: Resource, params: Params) =>
    runHandler('DELETE', resource, params),
  publish: async (resource: Resource, params: Params) =>
    runHandler('PUBLISH', resource, params),
  getMyAdminProfile,
  setEnrolmentAttendance,
};

export default dataProvider;
