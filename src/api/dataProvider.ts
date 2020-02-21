import { getVenues } from '../domain/venues/api/VenueApi';
import {
  MethodHandlers,
  Method,
  Resource,
  DataProviderParams as Params,
} from './types';

const METHOD_HANDLERS: MethodHandlers = {
  venues: {
    LIST: getVenues,
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
      data,
      total: data.length,
    };
  },
};

export default dataProvider;
