import { ApolloQueryResult } from 'apollo-boost';

import { Children } from '../../../api/generatedTypes/Children';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
} from '../../../api/utils/apiUtils';
import { childrenQuery, childQuery } from '../queries/ChildQueries';
import { Child as ApiChild } from '../../../api/generatedTypes/Child';

const getChildren: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<Children> = await queryHandler({
    query: childrenQuery,
    variables: { occurrenceId: params.id },
  });
  return response.data.children?.edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

const getChild: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiChild> = await queryHandler({
    query: childQuery,
    variables: { id: params.id },
  });
  return response.data.child
    ? mapApiDataToLocalData(response.data.child)
    : null;
};

export { getChildren, getChild };
