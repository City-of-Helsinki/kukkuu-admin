import type { ApolloQueryResult } from '@apollo/client';

import type { MethodHandler, MethodHandlerParams } from '../../api/types';
import { queryHandler, handleApiNode } from '../../api/utils/apiUtils';
import {
  ProjectDocument,
  type ProjectQuery,
} from '../api/generatedTypes/graphql';

const getProject: MethodHandler = async (params: MethodHandlerParams) => {
  // this makes our life easier by allowing usage of RA's query hooks
  if (!params.id) return { data: null };

  const response: ApolloQueryResult<ProjectQuery> = await queryHandler({
    query: ProjectDocument,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.project);
};

export { getProject };
