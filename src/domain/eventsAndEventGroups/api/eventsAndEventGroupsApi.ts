import { MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import { getProjectId } from '../../profile/utils';
import { eventsAndEventGroupsQuery } from '../queries/EventsAndEventGroupsQueries';

async function getEventsAndEventGroups(params: MethodHandlerParams) {
  const response = await queryHandler({
    query: eventsAndEventGroupsQuery,
    variables: { projectId: getProjectId() },
  });

  return handleApiConnection(response.data.eventsAndEventGroups);
}

const eventsAsEventGroupsApi = {
  getEventsAndEventGroups,
};

export default eventsAsEventGroupsApi;
