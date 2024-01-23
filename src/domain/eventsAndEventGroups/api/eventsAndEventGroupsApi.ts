import type { MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import { EventsAndEventGroupsDocument } from '../../api/generatedTypes/graphql';
import projectService from '../../projects/projectService';

async function getEventsAndEventGroups(params: MethodHandlerParams) {
  const response = await queryHandler({
    query: EventsAndEventGroupsDocument,
    variables: { projectId: projectService.projectId },
  });

  return handleApiConnection(response.data.eventsAndEventGroups);
}

const eventsAsEventGroupsApi = {
  getEventsAndEventGroups,
};

export default eventsAsEventGroupsApi;
