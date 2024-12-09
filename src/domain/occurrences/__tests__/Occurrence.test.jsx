import Occurrence from '../Occurrence';

describe('Occurrence helper class', () => {
  const occurrenceData = {
    time: '2020-10-10',
    event: {
      id: '123',
      name: 'Event name',
      duration: 30,
      eventGroup: {
        id: '123',
        name: 'Event Group Name',
      },
    },
  };
  const occurrence = new Occurrence(occurrenceData);

  describe('getters', () => {
    it('time', () => {
      expect(occurrence.time).toMatchInlineSnapshot(`"10.10.2020 03.00"`);
    });

    it('startTime', () => {
      expect(occurrence.startTime).toMatchInlineSnapshot(`"03.00"`);
    });

    it('endTime', () => {
      expect(occurrence.endTime).toMatchInlineSnapshot(`"03.30"`);
    });

    it('endTime without duration', () => {
      expect(
        new Occurrence({
          ...occurrenceData,
          event: {
            ...occurrenceData.event,
            duration: null,
          },
        }).endTime
      ).toMatchInlineSnapshot(`""`);
    });

    it('duration', () => {
      expect(occurrence.duration).toMatchInlineSnapshot(`"03.00 - 03.30"`);
    });

    it('duration without occurrence.duration', () => {
      const occurrenceWithoutDuration = new Occurrence({
        time: '2020-10-10',
        event: {
          duration: null,
        },
      });

      expect(occurrenceWithoutDuration.duration).toMatchInlineSnapshot(
        `"03.00 - "`
      );
    });

    it('occurrenceDateAndDuration', () => {
      expect(occurrence.occurrenceDateAndDuration).toMatchInlineSnapshot(
        `"10.10.2020 03.00 - 03.30"`
      );
    });

    it('title', () => {
      expect(occurrence.title).toMatchInlineSnapshot(
        `"Esiintymä 10.10.2020 03.00 - 03.30"`
      );
    });

    it('breadcrumbs when the event is within an event group', () => {
      expect(occurrence.breadcrumbs).toMatchInlineSnapshot(`
        [
          {
            "label": "Tapahtumat",
            "link": "/events-and-event-groups",
          },
          {
            "label": "Event Group Name",
            "link": "/event-groups/123/show",
          },
          {
            "label": "Event name",
            "link": "/events/123/show",
          },
        ]
      `);
    });

    it('breadcrumbs when the event is not within an event group', () => {
      const occurrenceWithoutEventGroup = new Occurrence({
        ...occurrenceData,
        event: {
          ...occurrenceData.event,
          eventGroup: undefined,
        },
      });

      expect(occurrenceWithoutEventGroup.breadcrumbs).toMatchInlineSnapshot(`
        [
          {
            "label": "Tapahtumat",
            "link": "/events-and-event-groups",
          },
          {
            "label": "Event name",
            "link": "/events/123/show",
          },
        ]
      `);
    });
  });
});
