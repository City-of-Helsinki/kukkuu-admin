import { ApolloQueryResult } from 'apollo-boost';

import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
  mapLocalDataToApiData,
  mutationHandler,
} from '../../../api/utils/apiUtils';
import { eventsQuery, eventQuery } from '../queries/EventQueries';
import { Events_events as ApiEvents } from '../../../api/generatedTypes/Events';
import { Event as ApiEvent } from '../../../api/generatedTypes/Event';
import {
  addEventMutation,
  updateEventMutation,
} from '../mutations/EventMutations';

const getEvents: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({ query: eventsQuery });
  return (response.data.events as ApiEvents).edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

const getEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const response: ApolloQueryResult<ApiEvent> = await queryHandler({
    query: eventQuery,
    variables: { id: params.id },
  });
  return response.data.event
    ? mapApiDataToLocalData(response.data.event)
    : null;
};

const addEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const data = mapLocalDataToApiData(params.data);
  const response = await mutationHandler({
    mutation: addEventMutation,
    variables: { input: data },
  });
  return response?.data?.addEvent.event
    ? mapApiDataToLocalData(response.data.addEvent.event)
    : null;
};

const updateEvent: MethodHandler = async (params: MethodHandlerParams) => {
  const { publishedAt, occurrences, ...localUpdateData } = params.data;
  const data = mapLocalDataToApiData(localUpdateData);
  const response = await mutationHandler({
    mutation: updateEventMutation,
    variables: { input: data },
  });
  return response?.data?.updateEvent.event
    ? mapApiDataToLocalData(response.data.updateEvent.event)
    : null;
};

export { getEvents, getEvent, addEvent, updateEvent };
