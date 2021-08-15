import { sum } from '../../common/utils';

// Using minimum types so that events of different compositions can be
// used with the utility, but to the kind of events that don't include
// the relevant fields.

type CapacityEventNode = {
  capacityPerOccurrence: number | null;
  occurrences: {
    edges: Array<unknown>;
  };
};

export function countCapacity(...events: CapacityEventNode[]): number | null {
  if (events.some((event) => event.capacityPerOccurrence === null)) {
    return null;
  }
  return sum(
    events.map(
      ({ capacityPerOccurrence, occurrences }: CapacityEventNode) =>
        (capacityPerOccurrence as number) * occurrences.edges.length
    )
  );
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

type EnrollmentsCountEventNode = {
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
    events.map((event) =>
      event.occurrences.edges.reduce(
        (sum: number, edge) => sum + (edge?.node?.enrolmentCount ?? 0),
        0
      )
    )
  );
}
