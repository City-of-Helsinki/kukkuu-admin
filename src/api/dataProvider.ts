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

  return handler(params);
};

const dataProvider = {
  getList: async (resource: Resource, params: Params) => {
    const data = await runHandler('LIST', resource, params);
    return {
      data: data,
      total: data.length,
    };
  },
  getOne: async (resource: Resource, params: Params) => {
    const data = await runHandler('ONE', resource, params);
    return { data };
  },
  getMany: async (resource: Resource, params: Params) => {
    const data = await runHandler('MANY', resource, params);
    return {
      data: data,
      total: data.length,
    };
  },
  getManyReference: async (resource: Resource, params: Params) => {
    const data = await runHandler('MANY_REFERENCE', resource, params);
    return {
      data: data,
      total: data.length,
    };
  },
  create: async (resource: Resource, params: Params) => {
    const data = await runHandler('CREATE', resource, params);
    return { data };
  },
  update: async (resource: Resource, params: Params) => {
    const data = await runHandler('UPDATE', resource, params);
    return { data };
  },
  delete: async (resource: Resource, params: Params) => {
    const data = await runHandler('DELETE', resource, params);
    return { data };
  },
  publish: async (resource: Resource, params: Params) => {
    const data = await runHandler('PUBLISH', resource, params);
    return { data };
  },
  getMyAdminProfile: async () => {
    const data = await getMyAdminProfile();
    return { data };
  },
  setEnrolmentAttendance: async (enrolmentId: string, attended: boolean) => {
    const data = await setEnrolmentAttendance(enrolmentId, attended);
    return { data };
  },
};

export default dataProvider;
