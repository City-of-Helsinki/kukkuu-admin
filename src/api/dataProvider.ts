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

const METHOD_HANDLERS: MethodHandlers = {
  venues: {
    LIST: getVenues,
    ONE: getVenue,
    CREATE: addVenue,
    UPDATE: updateVenue,
  },
  events: {
    LIST: getEvents,
    ONE: getEvent,
    CREATE: addEvent,
    UPDATE: updateEvent,
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
