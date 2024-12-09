import React from 'react';
import { screen, fireEvent, render } from '@testing-library/react';
import * as ReactAdmin from 'react-admin';

import LocalDataGrid from '../LocalDataGrid';

const TestField = ({ source }) => {
  const localRecord = ReactAdmin.useRecordContext();
  return localRecord[source];
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
};
const record = {
  records,
};

const getWrapper = (props) =>
  render(
    <LocalDataGrid {...defaultProps} {...props}>
      <TestField label="Name" source="name" />
      <TestField label="Count" source="count" />
    </LocalDataGrid>
  );

afterEach(() => {
  vi.clearAllMocks();
});

describe('<LocalDataGrid />', () => {
  describe('implementation details', () => {
    it('should extract expected table based on its children', async () => {
      // Mock the "parent record" - so mock only once
      vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValueOnce(record);
      getWrapper({});

      expect(await screen.findByText('Name')).toBeTruthy();
      expect(await screen.findByText('Count')).toBeTruthy();

      records.forEach(async (record) => {
        expect(await screen.findByText(record.name)).toBeTruthy();
        expect(await screen.findByText(record.count.toString())).toBeTruthy();
      });
    });

    it('should call rowClick when a row is clicked', async () => {
      // Mock the "parent record" - so mock only once
      vi.spyOn(ReactAdmin, 'useRecordContext').mockReturnValueOnce(record);
      const rowClick = vi.fn();
      getWrapper({ rowClick });

      fireEvent.click(await screen.findByText(records[0].name), {});

      expect(rowClick).toHaveBeenCalledTimes(1);
    });

    it('should not throw when it has an empty field', () => {
      expect(() => {
        render(<LocalDataGrid {...defaultProps}>{null}</LocalDataGrid>);
      }).not.toThrowError();
    });
  });
});
