import type { ApolloQueryResult } from '@apollo/client';
import pick from 'lodash/pick';

import type { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapLocalDataToApiData,
  mutationHandler,
  handleApiNode,
  handleApiConnection,
} from '../../../api/utils/apiUtils';
import {
  addEventMutation,
  copyEventMutation,
  publishEventMutation,
  updateEventMutation,
  deleteEventMutation,
} from '../mutations/EventMutations';
import projectService from '../../projects/projectService';
import { hasInternalTicketSystem } from '../utils';
import {
  EventsDocument,
  type EventQuery,
  EventDocument,
} from '../../api/generatedTypes/graphql';

const getEvents: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({
    query: EventsDocument,
    variables: { projectId: projectService.projectId },
  });
  return handleApiConnection(response.data.events);
};

const getEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<EventQuery> = await queryHandler({
    query: EventDocument,
    variables: { id: params.id },
  });
  const data = handleApiNode(response.data.event);
  return {
    data: {
      ...data.data,
      id: data.data?.id || '',
      organisationId: response.data.event?.organisation?.id,
    },
  };
};

const addEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const localUpdateData = pick(params.data, [
    'duration',
    'participantsPerInvite',
    'capacityPerOccurrence',
    'translations',
    'readyForEventGroupPublishing',
    'ticketSystem.type',
    'ticketSystem.url',
    'ticketSystem.endTime',
    'projectId',
    'eventGroupId',
    'sourceEventId',
    'organisationId',
  ]);
  const data = mapLocalDataToApiData(localUpdateData);
  data.projectId = data.projectId || projectService.projectId;

  const isCopy = Boolean(data.sourceEventId);

  if (params.data.image) {
    data.image = params.data.image.rawFile;
  }

  if (hasInternalTicketSystem(data)) {
    try {
      delete data.ticketSystem.url;
      delete data.ticketSystem.endTime;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        'Could not delete ticketSystem data from internal event',
        e
      );
    }
  } else {
    try {
      delete data.capacityPerOccurrence;
      delete data.duration;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        'Could not delete capacity and duration data from external event',
        e
      );
    }
  }

  const response = await mutationHandler({
    mutation: isCopy ? copyEventMutation : addEventMutation,
    variables: { input: data },
  });

  return handleApiNode(
    response.data?.[isCopy ? 'copyEvent' : 'addEvent'].event
  );
};

const updateEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const localUpdateData = pick(params.data, [
    'id',
    'duration',
    'participantsPerInvite',
    'capacityPerOccurrence',
    'translations',
    'readyForEventGroupPublishing',
    'ticketSystem.url',
    'ticketSystem.endTime',
    'organisationId',
  ]);
  const data = mapLocalDataToApiData(localUpdateData);

  if (params.data.image) {
    data.image = params.data.image.rawFile;
  } else {
    data.image = '';
  }

  if (hasInternalTicketSystem(params.data)) {
    if (data.ticketSystem) {
      delete data.ticketSystem.url;
      delete data.ticketSystem.endTime;
    }
  } else {
    delete data.capacityPerOccurrence;
    delete data.duration;
  }

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
