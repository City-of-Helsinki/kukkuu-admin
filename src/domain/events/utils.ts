import { sum } from '../../common/utils';
import { TicketSystem } from '../../api/generatedTypes/globalTypes';
import { EventGroup_eventGroup } from '../../api/generatedTypes/EventGroup';
import { EventFragment as EventNode } from '../../api/generatedTypes/EventFragment';
import RelayList from '../../api/relayList';

// Using minimum types so that events of different compositions can be
// used with the utility.
type Occurrence = {
  capacityOverride?: number | null;
};
export type CapacityEventNode = {
  capacityPerOccurrence: number | null;
  occurrences: {
    edges: ({
      node?: Occurrence | null;
    } | null)[];
  };
};
type CapacityEventNodeWithCapacityPerOccurrence = CapacityEventNode & {
  capacityPerOccurrence: number;
};

export function getEventGroupEventNodes<ResultType = any>(
  eventGroup: EventGroup_eventGroup
) {
  return eventGroup.events.edges?.reduce((result: ResultType[], edge) => {
    if (edge?.node) {
      result.push(edge.node as ResultType);
    }
    return result;
  }, []);
}

export function countCapacity(...events: CapacityEventNode[]): number | null {
  const eventsWithCapacities = events.filter(
    (event): event is CapacityEventNodeWithCapacityPerOccurrence =>
      event.capacityPerOccurrence !== null
  );

  if (events.length !== eventsWithCapacities.length) {
    return null;
  }

  const occurrenceCapacities = eventsWithCapacities.flatMap(
    ({ capacityPerOccurrence, occurrences }) => {
      return occurrences.edges?.map((occurrenceEdge) => {
        const capacityOverride = occurrenceEdge?.node?.capacityOverride;

        return capacityOverride ?? capacityPerOccurrence;
      });
    }
  );

  return sum(occurrenceCapacities);
}

type CountEventNode = {
  occurrences: {
    edges: Array<unknown>;
  };
};

export function countOccurrences(...events: CountEventNode[]): number {
  return sum(
    events.map(({ occurrences }: CountEventNode) => occurrences.edges.length)
  );
}

export type EnrollmentsCountEventNode = {
  occurrences: {
    edges: (null | {
      node: {
        enrolmentCount: number;
      } | null;
    })[];
  };
};

export function countEnrollments(
  ...events: EnrollmentsCountEventNode[]
): number {
  return sum(
    events?.map((event) =>
      event.occurrences.edges.reduce(
        (sum: number, edge) => sum + (edge?.node?.enrolmentCount ?? 0),
        0
      )
    ) ?? 0
  );
}

export type RecordWithTicketSystem = {
  ticketSystem?: {
    type: TicketSystem;
  } | null;
};

export function hasInternalTicketSystem(record?: RecordWithTicketSystem) {
  const type = record?.ticketSystem?.type;
  return type ? type === TicketSystem.INTERNAL : true;
}

export const EventList = RelayList<EventNode>();
