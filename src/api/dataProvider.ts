import {
  getVenues,
  getVenue,
  addVenue,
  updateVenue,
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
} from '../domain/events/api/EventApi';
import {
  addOccurrence,
  getOccurrences,
} from '../domain/occurrences/api/OccurrenceApi';
import { getChild, getChildren } from '../domain/children/api/ChildApi';

const METHOD_HANDLERS: MethodHandlers = {
  venues: {
    LIST: getVenues,
    ONE: getVenue,
    MANY: getVenues,
    CREATE: addVenue,
    UPDATE: updateVenue,
  },
  events: {
    LIST: getEvents,
    ONE: getEvent,
    MANY: getEvents,
    CREATE: addEvent,
    UPDATE: updateEvent,
  },
  occurrences: {
    CREATE: addOccurrence,
    MANY_REFERENCE: getOccurrences,
  },
  children: {
    LIST: getChildren,
    ONE: getChild,
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
};

export default dataProvider;
