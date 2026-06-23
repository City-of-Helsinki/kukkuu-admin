import React, { type ReactElement, Children } from 'react';
import { Table, TableHead, TableRow, TableBody } from '@mui/material';
import {
  DatagridHeaderCell,
  DatagridCell,
  useRecordContext,
  useResourceContext,
  RecordContextProvider,
} from 'react-admin';
import get from 'lodash/get';

function disableSorting(field: ReactElement) {
  return {
    ...field,
    props: Object.assign({}, field.props, {
      sortable: false,
    }),
  };
}

const LocalDataGrid = ({ children, source, rowClick }: any) => {
  const record = useRecordContext();
  const resource = useResourceContext();
  const handleRowClick = (localRecord?: any) => {
    rowClick(localRecord);
  };

  const localRecords = get(record, source, []);
  const isHover = Boolean(handleRowClick);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {Children.map(
            children,
            (field, index) =>
              field && (
                <DatagridHeaderCell
                  field={disableSorting(field)}
                  isSorting={false}
                  key={field.props.source || index}
                  sort={{
                    field: 'any',
                    order: 'ASC',
                  }}
                  updateSort={() => {
                    // pass
                  }}
                />
              )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {localRecords.map((localRecord: any) => (
          <TableRow
            key={localRecord.id}
            hover={isHover}
            onClick={() => {
              handleRowClick(localRecord);
            }}
          >
            {React.Children.map(
              children,
              (field, index) =>
                field && (
                  <RecordContextProvider value={localRecord}>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, max-len */}
                    {/* @ts-ignore - ts2739 is a bug in the react-adminlibrary and adding those missing prosp as undefined raises a warning. */}
                    <DatagridCell
                      key={`${localRecord.id}-${field.props.source || index}`}
                      className={`column-${field.props.source}`}
                      record={localRecord}
                      {...{ field, resource }}
                    />
                  </RecordContextProvider>
                )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LocalDataGrid;
