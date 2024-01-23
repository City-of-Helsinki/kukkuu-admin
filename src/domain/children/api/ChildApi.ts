import type { ApolloQueryResult } from '@apollo/client';

import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  handleApiConnection,
  handleApiNode,
} from '../../../api/utils/apiUtils';
import projectService from '../../projects/projectService';
import {
  ChildrenDocument,
  type ChildQuery,
  type ChildrenQuery,
  ChildDocument,
} from '../../api/generatedTypes/graphql';

const getChildren: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ChildrenQuery> = await queryHandler({
    query: ChildrenDocument,
    variables: {
      projectId: projectService.projectId,
      occurrenceId: params.id,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
    },
  });
  return handleApiConnection(response.data.children);
};

const getChild: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ChildQuery> = await queryHandler({
    query: ChildDocument,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.child);
};

export { getChildren, getChild };
