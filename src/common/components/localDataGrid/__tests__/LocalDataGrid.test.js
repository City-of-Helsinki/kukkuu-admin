import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import LocalDataGrid from '../LocalDataGrid';

const TestField = ({ record, source }) => {
  return record[source];
};

const records = [
  {
    id: '123',
    name: 'TestRecord',
    count: 12,
  },
  {
    id: '1234',
    name: 'TestRecord2',
    count: 11,
  },
];
const defaultProps = {
  source: 'records',
  record: {
    records,
  },
};
const getWrapper = (props) =>
  render(
    <LocalDataGrid {...defaultProps} {...props}>
      <TestField label="Name" source="name" />
      <TestField label="Count" source="count" />
    </LocalDataGrid>
  );

describe('<LocalDataGrid />', () => {
  describe('implementation details', () => {
    it('should extract expected table based on its children', () => {
      const { queryByText } = getWrapper();

      expect(queryByText('Name')).toBeTruthy();
      expect(queryByText('Count')).toBeTruthy();

      records.forEach((record) => {
        expect(queryByText(record.name)).toBeTruthy();
        expect(queryByText(record.count.toString())).toBeTruthy();
      });
    });

    it('should call rowClick when a row is clicked', () => {
      const rowClick = jest.fn();
      const { getByText } = getWrapper({ rowClick });

      fireEvent.click(getByText(records[0].name), {});

      expect(rowClick).toHaveBeenCalledTimes(1);
    });
  });
});
