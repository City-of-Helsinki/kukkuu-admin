import { MethodHandlerParams } from '../../../api/types';
import { getEvents } from '../../events/api/EventApi';

async function getEventsAndEventGroups(params: MethodHandlerParams) {
  // Return events until we can use the events and event groups API
  return getEvents(params);
}

const eventsAsEventGroupsApi = {
  getEventsAndEventGroups,
};

export default eventsAsEventGroupsApi;
