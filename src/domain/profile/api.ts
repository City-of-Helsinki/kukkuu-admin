import { ApolloQueryResult } from 'apollo-boost';

import { queryHandler, mapApiDataToLocalData } from '../../api/utils/apiUtils';
import { myAdminProfileQuery } from './queries';
import {
  MyAdminProfile as MyAdminProfileQueryResult,
  MyAdminProfile_myAdminProfile as MyAdminProfile,
} from '../../api/generatedTypes/MyAdminProfile';

const getMyAdminProfile = async (): Promise<MyAdminProfile> => {
  const response: ApolloQueryResult<MyAdminProfileQueryResult> = await queryHandler(
    {
      query: myAdminProfileQuery,
    }
  );
  return mapApiDataToLocalData(response.data.myAdminProfile);
};

export { getMyAdminProfile };
