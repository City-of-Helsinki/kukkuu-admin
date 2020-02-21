import { QueryOptions, OperationVariables } from 'apollo-boost';
import { HttpError } from 'react-admin';

import client from './client';

/**
 * Add generic error handler for Apollo query
 * with error match with React-admin error handling standard
 * @param queryOptions Apollo query options
 */
export const queryHandler = async (
  queryOptions: QueryOptions<OperationVariables>
) => {
  try {
    const res = await client.query(queryOptions);
    return res;
  } catch (error) {
    throw new HttpError(error.message || 'Query error');
  }
};
