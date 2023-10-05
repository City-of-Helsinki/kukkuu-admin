import { ApolloQueryResult } from '@apollo/client';

import { queryHandler, handleApiNode } from '../../api/utils/apiUtils';
import { myAdminProfileQuery } from './queries';
import {
  MyAdminProfile as MyAdminProfileQueryResult,
  MyAdminProfile_myAdminProfile,
} from '../../api/generatedTypes/MyAdminProfile';

const getMyAdminProfile = async () => {
  const response: ApolloQueryResult<MyAdminProfileQueryResult> =
    await queryHandler({
      query: myAdminProfileQuery,
    });
  return handleApiNode<MyAdminProfile_myAdminProfile>(
    response.data.myAdminProfile
  );
};

export { getMyAdminProfile };
