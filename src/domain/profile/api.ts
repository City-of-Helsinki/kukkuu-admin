import { ApolloQueryResult } from '@apollo/client';

import { queryHandler, handleApiNode } from '../../api/utils/apiUtils';
import { myAdminProfileQuery } from './queries';
import { MyAdminProfile as MyAdminProfileQueryResult } from '../../api/generatedTypes/MyAdminProfile';

const getMyAdminProfile = async () => {
  const response: ApolloQueryResult<MyAdminProfileQueryResult> =
    await queryHandler({
      query: myAdminProfileQuery,
    });
  return handleApiNode(response.data.myAdminProfile);
};

export { getMyAdminProfile };
