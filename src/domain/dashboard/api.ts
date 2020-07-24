import { ApolloQueryResult } from 'apollo-client';

import { MethodHandler, MethodHandlerParams } from '../../api/types';
import { queryHandler, handleApiNode } from '../../api/utils/apiUtils';
import { projectQuery } from './queries';
import { Project } from '../../api/generatedTypes/Project';

const getProject: MethodHandler = async (params: MethodHandlerParams) => {
  // this makes our life easier by allowing usage of RA's query hooks
  if (!params.id) return { data: null };

  const response: ApolloQueryResult<Project> = await queryHandler({
    query: projectQuery,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.project);
};

export { getProject };
