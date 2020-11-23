import { MethodHandlerParams } from '../../../api/types';
import { EventGroup_eventGroup_events_edges_node as EventNode } from '../../../api/generatedTypes/EventGroup';
import { queryHandler, handleApiNode } from '../../../api/utils/apiUtils';
import RelayList from '../../../api/relayList';
import { eventGroupQuery } from '../queries/EvenGroupQueries';

const EvenList = RelayList<EventNode>();

async function getEventGroup(params: MethodHandlerParams) {
  const response = await queryHandler({
    query: eventGroupQuery,
    variables: { id: params.id },
  });

  const eventGroup = response.data.eventGroup;

  return handleApiNode({
    ...eventGroup,
    events: EvenList(eventGroup.events).items,
  });
}

async function addEventGroup() {
  return null;
}

async function updateEventGroup() {
  return null;
}

async function deleteEventGroup() {
  return null;
}

async function publishEventGroup() {
  return null;
}

const eventGroupsApi = {
  getEventGroup,
  addEventGroup,
  updateEventGroup,
  deleteEventGroup,
  publishEventGroup,
};

export default eventGroupsApi;
