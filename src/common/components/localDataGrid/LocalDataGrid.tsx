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
import { makeStyles } from '@mui/styles';

// TODO: Can this be totally removed?
// During the migration in KK-1017, an alternative for useDtaGridStyles was not found.
const useDatagridStyles = makeStyles((theme) => ({
  table: {},
  thead: {},
  row: {},
  headerRow: {},
  headerCell: {},
  rowCell: {},
  clickableRow: {},
}));

function disableSorting(field: ReactElement) {
  return {
    ...field,
    props: {
      ...field.props,
      sortable: false,
    },
  };
}

const LocalDataGrid = ({ children, source, rowClick }: any) => {
  const classes = useDatagridStyles();
  const record = useRecordContext();
  const resource = useResourceContext();
  const handleRowClick = (localRecord?: any) => {
    rowClick(localRecord);
  };

  const localRecords = get(record, source, []);
  const isHover = Boolean(handleRowClick);

  return (
    <Table className={classes.table} size="small">
      <TableHead className={classes.thead}>
        <TableRow className={[classes.row, classes.headerRow].join(' ')}>
          {Children.map(
            children,
            (field, index) =>
              field && (
                <DatagridHeaderCell
                  className={classes.headerCell}
                  field={disableSorting(field)}
                  isSorting={false}
                  key={field.props.source || index}
                  resource={resource}
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
            className={rowClick ? classes.clickableRow : undefined}
          >
            {React.Children.map(
              children,
              (field, index) =>
                field && (
                  <RecordContextProvider value={localRecord}>
                    <DatagridCell
                      placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} 
                      key={`${localRecord.id}-${field.props.source || index}`}
                      className={[
                        `column-${field.props.source}`,
                        classes.rowCell,
                      ].join(' ')}
                      record={localRecord}
                      {...{ field, resource }}                    />
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
