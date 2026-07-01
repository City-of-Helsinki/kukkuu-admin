import { when, handleRowClick } from '../EventsAndEventGroupsList';

const event = { id: '10', name: 'Event 10' };
const eventGroup = {
  id: '20',
  name: 'Event group 20',
  events: { edges: [] },
};

describe('EventsAndEventGroupsList helpers', () => {
  describe('handleRowClick', () => {
    it('routes a plain event record to /events/:id/show', () => {
      expect(handleRowClick(event.id, 'events-and-event-groups', event)).toBe(
        '/events/10/show'
      );
    });

    it('routes an event-group record (has an `events` property) to /event-groups/:id/show', () => {
      expect(
        handleRowClick(eventGroup.id, 'events-and-event-groups', eventGroup)
      ).toBe('/event-groups/20/show');
    });
  });

  describe('when', () => {
    it('invokes the event branch for records without an `events` property', () => {
      const onEvent = vi.fn(() => 'event-result');
      const onEventGroup = vi.fn(() => 'event-group-result');

      const result = when(event, onEvent, onEventGroup);

      expect(onEvent).toHaveBeenCalledWith(event);
      expect(onEventGroup).not.toHaveBeenCalled();
      expect(result).toBe('event-result');
    });

    it('invokes the event-group branch for records with an `events` property', () => {
      const onEvent = vi.fn(() => 'event-result');
      const onEventGroup = vi.fn(() => 'event-group-result');

      const result = when(eventGroup, onEvent, onEventGroup);

      expect(onEventGroup).toHaveBeenCalledWith(eventGroup);
      expect(onEvent).not.toHaveBeenCalled();
      expect(result).toBe('event-group-result');
    });
  });
});
