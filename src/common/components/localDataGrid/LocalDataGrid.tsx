import React, { Children, ReactElement } from 'react';
import { Table, TableHead, TableRow, TableBody } from '@mui/material';
import { DatagridHeaderCell, DatagridCell } from 'react-admin';
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

const LocalDataGrid = ({
  children,
  resource,
  record,
  source,
  basePath,
  rowClick,
}: any) => {
  const classes = useDatagridStyles();

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
                  key={(field.props as any).source || index}
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
            onClick={() => handleRowClick(localRecord)}
            className={rowClick ? classes.clickableRow : undefined}
          >
            {React.Children.map(
              children,
              (field, index) =>
                field && (
                  <DatagridCell
                    key={`${localRecord.id}-${
                      (field.props as any).source || index
                    }`}
                    className={[
                      `column-${(field.props as any).source}`,
                      classes.rowCell,
                    ].join(' ')}
                    record={localRecord}
                    {...{ field, basePath, resource }}
                  />
                )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LocalDataGrid;
