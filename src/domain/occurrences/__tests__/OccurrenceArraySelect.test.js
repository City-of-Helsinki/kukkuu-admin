import React from 'react';
import { render } from '@testing-library/react';
import { AdminContext, SimpleForm } from 'react-admin';

import OccurrenceArraySelect, {
  getChoices,
  getFilters,
  getValues,
} from '../OccurrenceArraySelect';

describe('<OccurrenceArraySelect />', () => {
  it('should render without errors', () => {
    jest.spyOn(global.console, 'error').mockImplementationOnce(() => null);

    expect(
      render(
        <AdminContext
          initialState={{ admin: { resources: { occurrences: { data: {} } } } }}
        >
          <SimpleForm>
            <OccurrenceArraySelect
              allText="allText"
              eventId="1"
              source="event"
            />
          </SimpleForm>
        </AdminContext>
      )
    ).toMatchSnapshot();
  });
});

describe('OccurrenceArraySelect helpers', () => {
  describe('getFilters', () => {
    it('should return undefined if there is no event id', () => {
      expect(getFilters()).toBeUndefined();
    });

    it('otherwise it should return filters', () => {
      expect(getFilters('123')).toEqual({
        eventId: '123',
      });
    });
  });

  describe('getChoices', () => {
    it('should make choices out of occurrences', () => {
      const occurrences = [
        {
          id: '123',
          time: '2020-10-7',
        },
        {
          id: '12',
          time: '2020-11-7',
        },
      ];
      const choices = getChoices(occurrences);

      expect(choices.length).toEqual(occurrences.length);
      expect(choices[0]).toMatchInlineSnapshot(`
        Object {
          "id": "123",
          "name": "7.10.2020 00.00",
        }
      `);
    });
  });

  describe('getValues', () => {
    it('should remove all from selected values if some other option is selected', () => {
      expect(getValues(['all'], ['other options']).includes('all')).toBe(false);
    });

    it('should only return all if all is selected', () => {
      expect(getValues(['value 1', 'value 1'], ['all'])).toEqual(['all']);
    });

    it('should return all if nothing is selected', () => {
      expect(getValues(['value 1', 'value 1'], [])).toEqual(['all']);
    });

    it('otherwise it should return next values', () => {
      const nextValues = ['value 1', 'value 2'];

      expect(getValues(['value 1'], nextValues)).toEqual(nextValues);
    });
  });
});
