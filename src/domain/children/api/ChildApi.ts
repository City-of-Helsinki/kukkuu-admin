import { ApolloQueryResult } from 'apollo-boost';

import { Children } from '../../../api/generatedTypes/Children';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
} from '../../../api/utils/apiUtils';
import { childrenQuery } from '../queries/ChildQueries';

const getChildren: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<Children> = await queryHandler({
    query: childrenQuery,
  });
  return response.data.children?.edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

export { getChildren };
