import React, { Children, ReactElement } from 'react';
import { Table, TableHead, TableRow, TableBody } from '@material-ui/core';
import {
  useDatagridStyles,
  DatagridHeaderCell,
  DatagridCell,
} from 'react-admin';
import get from 'lodash/get';

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
}: any) => {
  const classes = useDatagridStyles();
  const localRecords = get(record, source, []);

  return (
    <Table className={classes.table} size="small">
      <TableHead className={classes.thead}>
        <TableRow className={[classes.row, classes.headerRow].join(' ')}>
          {Children.map(children, (field, index) => (
            <DatagridHeaderCell
              className={classes.headerCell}
              field={disableSorting(field)}
              isSorting={false}
              key={(field.props as any).source || index}
              resource={resource}
              currentSort={{
                field: 'any',
                order: 'ASC',
              }}
              updateSort={() => {
                // pass
              }}
            />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {localRecords.map((localRecord: any) => (
          <TableRow key={localRecord.id}>
            {React.Children.map(children, (field, index) => (
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
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LocalDataGrid;
