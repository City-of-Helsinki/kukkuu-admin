import { MethodHandlerParams } from '../../../api/types';
import { queryHandler, handleApiConnection } from '../../../api/utils/apiUtils';
import profileService from '../../profile/profileService';
import { eventsAndEventGroupsQuery } from '../queries/EventsAndEventGroupsQueries';

async function getEventsAndEventGroups(params: MethodHandlerParams) {
  const response = await queryHandler({
    query: eventsAndEventGroupsQuery,
    variables: { projectId: profileService.projectId },
  });

  return handleApiConnection(response.data.eventsAndEventGroups);
}

const eventsAsEventGroupsApi = {
  getEventsAndEventGroups,
};

export default eventsAsEventGroupsApi;
