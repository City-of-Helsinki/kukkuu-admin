import { MethodHandlerParams } from '../../../api/types';
import { EventGroup_eventGroup_events_edges_node as EventNode } from '../../../api/generatedTypes/EventGroup';
import {
  queryHandler,
  handleApiNode,
  mapLocalDataToApiData,
  mutationHandler,
} from '../../../api/utils/apiUtils';
import RelayList from '../../../api/relayList';
import profileService from '../../profile/profileService';
import { eventGroupQuery } from '../queries/EvenGroupQueries';
import {
  addEventGroupMutation,
  updateEventGroupMutation,
  deleteEventGroupMutation,
  publishEventGroupMutation,
} from '../mutations/EventGroupMutations';

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

async function addEventGroup(params: MethodHandlerParams) {
  const data = mapLocalDataToApiData(params.data);
  const response = await mutationHandler({
    mutation: addEventGroupMutation,
    variables: {
      input: {
        ...data,
        projectId: profileService.projectId,
      },
    },
  });

  return handleApiNode(response.data?.addEventGroup.eventGroup);
}

async function updateEventGroup(params: MethodHandlerParams) {
  const { id, translations } = params.data;
  const input = {
    id,
    translations,
    projectId: profileService.projectId,
  };
  const cleanedInput = mapLocalDataToApiData(input);
  const response = await mutationHandler({
    mutation: updateEventGroupMutation,
    variables: {
      input: cleanedInput,
    },
  });

  return handleApiNode(response.data?.updateEventGroup.eventGroup);
}

async function deleteEventGroup({ id }: MethodHandlerParams) {
  const input = { id };

  await mutationHandler({
    mutation: deleteEventGroupMutation,
    variables: { input },
  });

  return { data: { id } };
}

async function publishEventGroup({ id }: MethodHandlerParams) {
  const response = await mutationHandler({
    mutation: publishEventGroupMutation,
    variables: { input: { id } },
  });

  return handleApiNode(response.data?.publishEventGroup.eventGroup);
}

const eventGroupsApi = {
  getEventGroup,
  addEventGroup,
  updateEventGroup,
  deleteEventGroup,
  publishEventGroup,
};

export default eventGroupsApi;
