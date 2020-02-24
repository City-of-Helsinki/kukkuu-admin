import { MethodHandler, MethodHandlerParams } from '../../../api/types';
import {
  queryHandler,
  mapApiDataToLocalData,
} from '../../../api/utils/apiUtils';
import { eventsQuery } from '../queries/EventQueries';
import { Events_events as ApiEvents } from '../../../api/generatedTypes/Events';

/**
 * Get list of events
 */
const getEvents: MethodHandler = async (params: MethodHandlerParams) => {
  const response = await queryHandler({ query: eventsQuery });
  return (response.data.events as ApiEvents).edges.map(edge =>
    edge?.node ? mapApiDataToLocalData(edge.node) : null
  );
};

export { getEvents };
