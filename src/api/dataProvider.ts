import { HttpError } from 'react-admin';

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
    throw new HttpError(`Invalid resource "${resource}".`);
  }

  const handler = handlers[method];
  if (!handler) {
    throw new HttpError(
      `Method "${method}" for resource "${resource}" is not implemented.`
    );
  }

  try {
    const data = await handler(params);

    return {
      data,
      total: data.length,
    };
  } catch (error) {
    throw new HttpError('Http error');
  }
};

const dataProvider = {
  getList: (resource: Resource, params: Params) =>
    runHandler('LIST', resource, params),
};

export default dataProvider;
