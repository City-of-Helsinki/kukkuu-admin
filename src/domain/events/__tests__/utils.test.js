import { countCapacity, countEnrollments, countOccurrences } from '../utils';

describe('event utils', () => {
  describe('countCapacity', () => {
    const mockEvent = {
      capacityPerOccurrence: 5,
      occurrences: {
        edges: [null, null, null],
      },
    };

    it('should return the capacity for an event', () => {
      expect(countCapacity(mockEvent)).toEqual(15);
    });

    it('should return the capacity for many events', () => {
      expect(countCapacity(mockEvent, mockEvent)).toEqual(30);
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
});
