import {
  countCapacity,
  countEnrollments,
  countOccurrences,
  getEventGroupEventNodes,
  hasInternalTicketSystem,
} from '../utils';
import { TicketSystem } from '../../api/generatedTypes/graphql';

describe('event utils', () => {
  describe('countCapacity', () => {
    const mockEvent = {
      capacityPerOccurrence: 5,
      occurrences: {
        edges: [
          null,
          null,
          {
            node: {
              capacityOverride: 1,
            },
          },
        ],
      },
    };
    const mockEventWithoutCapacity = {
      capacityPerOccurrence: null,
      occurrences: {
        edges: [null, null, null],
      },
    };

    it('should return the capacity for an event', () => {
      expect(countCapacity(mockEvent)).toEqual(11);
    });

    it('should return the capacity for many events', () => {
      expect(countCapacity(mockEvent, mockEvent)).toEqual(22);
    });

    it('should return null if any event is missing a capacity', () => {
      expect(countCapacity(mockEvent, mockEventWithoutCapacity)).toEqual(null);
    });
  });

  describe('countOccurrences', () => {
    const mockEvent = {
      occurrences: {
        edges: [null, null, null],
      },
    };

    it('should return the count of occurrences for an event', () => {
      expect(countOccurrences(mockEvent)).toEqual(3);
    });

    it('should return the count of occurrences for many events', () => {
      expect(countOccurrences(mockEvent, mockEvent)).toEqual(6);
    });
  });

  describe('countEnrollments', () => {
    const mockEvent = {
      occurrences: {
        edges: [
          {
            node: {
              enrolmentCount: 4,
            },
          },
          {
            node: {
              enrolmentCount: 3,
            },
          },
        ],
      },
    };

    it('should return the count of enrollments for an event', () => {
      expect(countEnrollments(mockEvent)).toEqual(7);
    });

    it('should return the count of enrollments for many events', () => {
      expect(countEnrollments(mockEvent, mockEvent)).toEqual(14);
    });
  });

  describe('getEventGroupEventNodes', () => {
    it('returns the underlying event nodes from an event group', () => {
      const eventGroup = {
        events: {
          edges: [
            { node: { id: '1', name: 'Alpha' } },
            { node: { id: '2', name: 'Beta' } },
          ],
        },
      };
      expect(getEventGroupEventNodes(eventGroup)).toEqual([
        { id: '1', name: 'Alpha' },
        { id: '2', name: 'Beta' },
      ]);
    });

    it('skips null edges and edges without a node', () => {
      const eventGroup = {
        events: {
          edges: [null, { node: null }, { node: { id: '3' } }],
        },
      };
      expect(getEventGroupEventNodes(eventGroup)).toEqual([{ id: '3' }]);
    });

    it('returns an empty array for an event group with no edges', () => {
      expect(getEventGroupEventNodes({ events: { edges: [] } })).toEqual([]);
    });
  });

  describe('hasInternalTicketSystem', () => {
    it('returns true when the record has no ticket system', () => {
      expect(hasInternalTicketSystem(undefined)).toBe(true);
      expect(hasInternalTicketSystem({})).toBe(true);
      expect(hasInternalTicketSystem({ ticketSystem: null })).toBe(true);
    });

    it('returns true when the ticket system is Internal', () => {
      expect(
        hasInternalTicketSystem({
          ticketSystem: { type: TicketSystem.Internal },
        })
      ).toBe(true);
    });

    it('returns false when the ticket system is external (Lippupiste)', () => {
      expect(
        hasInternalTicketSystem({
          ticketSystem: { type: TicketSystem.Lippupiste },
        })
      ).toBe(false);
    });
  });
});
