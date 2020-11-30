import Occurrence from '../Occurrence';

describe('Occurrence helper class', () => {
  const occurrence = new Occurrence({
    time: '2020-10-10',
    event: {
      duration: 30,
    },
  });

  describe('getters', () => {
    it('time', () => {
      expect(occurrence.time).toMatchInlineSnapshot(`"10.10.2020 klo 03.00"`);
    });

    it('startTime', () => {
      expect(occurrence.startTime).toMatchInlineSnapshot(`"03.00"`);
    });

    it('endTime', () => {
      expect(occurrence.endTime).toMatchInlineSnapshot(`"03.30"`);
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
        `"03.00 - null"`
      );
    });

    it('occurrenceDateAndDuration', () => {
      expect(occurrence.occurrenceDateAndDuration).toMatchInlineSnapshot(
        `"10.10.2020 klo 03.00 - 03.30"`
      );
    });

    it('title', () => {
      expect(occurrence.title).toMatchInlineSnapshot(
        `"Esiintymä 10.10.2020 klo 03.00 - 03.30"`
      );
    });
  });
});
