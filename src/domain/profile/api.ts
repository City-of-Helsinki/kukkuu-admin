import type { ApolloQueryResult } from '@apollo/client';

import { queryHandler, handleApiNode } from '../../api/utils/apiUtils';
import {
  MyAdminProfileDocument,
  type MyAdminProfileQuery,
} from '../api/generatedTypes/graphql';

const getMyAdminProfile = async () => {
  const response: ApolloQueryResult<MyAdminProfileQuery> = await queryHandler({
    query: MyAdminProfileDocument,
  });
  return handleApiNode(response.data.myAdminProfile);
};

export { getMyAdminProfile };
