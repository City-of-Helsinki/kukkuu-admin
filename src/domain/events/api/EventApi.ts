import { ApolloQueryResult } from '@apollo/client';

import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiNode,
  handleApiConnection,
} from '../../../api/utils/apiUtils';
import { eventsQuery, eventQuery } from '../queries/EventQueries';
import { Event as ApiEvent } from '../../../api/generatedTypes/Event';
import {
  addEventMutation,
  publishEventMutation,
  updateEventMutation,
  deleteEventMutation,
} from '../mutations/EventMutations';
import profileService from '../../profile/profileService';

const getEvents: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({
    query: eventsQuery,
    variables: { projectId: profileService.projectId },
  });
  return handleApiConnection(response.data.events);
};

const getEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiEvent> = await queryHandler({
    query: eventQuery,
    variables: { id: params.id },
  });
  return handleApiNode(response.data.event);
};

const addEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data);
  data['projectId'] = profileService.projectId;
  if (params.data.image) {
    data.image = params.data.image.rawFile;
  }

  const response = await mutationHandler({
    mutation: addEventMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.addEvent.event);
};

const updateEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const {
    publishedAt,
    occurrences,
    image,
    name,
    eventGroup,
    ...localUpdateData
  } = params.data;
  const data = mapLocalDataToApiData(localUpdateData);

  if (params.data.image) {
    data.image = params.data.image.rawFile;
  }
  data.eventGroupId = eventGroup ? eventGroup.id : null;

  const response = await mutationHandler({
    mutation: updateEventMutation,
    variables: { input: data },
  });

  return handleApiNode(response.data?.updateEvent.event);
};

const publishEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await mutationHandler({
    mutation: publishEventMutation,
    variables: { input: { id: params.id } },
  });
  return handleApiNode(response.data?.publishEvent.event);
};

const deleteEvent: MethodHandler = async (params: MethodHandlerParams) => {
  await mutationHandler({
    mutation: deleteEventMutation,
    variables: { input: { id: params.id } },
  });
  return { data: { id: params.id } };
};

const setReady: MethodHandler = async (params: MethodHandlerParams) => {
  const { id, readyForEventGroupPublishing } = params;
  const response = await mutationHandler({
    mutation: updateEventMutation,
    variables: {
      input: {
        id,
        readyForEventGroupPublishing,
      },
    },
  });

  return handleApiNode(response.data?.updateEvent.event);
};

export {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  publishEvent,
  deleteEvent,
  setReady,
};
