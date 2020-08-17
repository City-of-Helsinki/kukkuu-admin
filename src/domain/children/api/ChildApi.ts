import { ApolloQueryResult } from 'apollo-client';

import { Children } from '../../../api/generatedTypes/Children';
import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  handleApiConnection,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import { childrenQuery, childQuery } from '../queries/ChildQueries';
import { Child as ApiChild } from '../../../api/generatedTypes/Child';
import { getProjectId } from '../../profile/utils';

const getChildren: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<Children> = await queryHandler({
    query: childrenQuery,
    variables: {
      projectId: getProjectId(),
      occurrenceId: params.id,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
    },
  });
  return handleApiConnection(response.data.children);
};

const getChild: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiChild> = await queryHandler({
    query: childQuery,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.child);
};

export { getChildren, getChild };
