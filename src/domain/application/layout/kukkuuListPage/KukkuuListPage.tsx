import React from 'react';
import { type DatagridProps, type ListProps, Datagrid } from 'react-admin';
import { makeStyles } from '@mui/styles';

import KukkuuList from './KukkuuList';
import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';

const useStyles = makeStyles({
  list: {
    '& > .MuiToolbar-root': {
      // Use slightly less padding between title and actions
      marginTop: '-24px',
    },
  },
});

type Props = {
  pageTitle: string;
  children: React.ReactNode;
  reactAdminProps?: Omit<ListProps, 'children'>;
  datagridProps?: DatagridProps;
};

const KukkuuListPage = ({
  pageTitle,
  children,
  reactAdminProps,
  datagridProps = {},
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>
      <KukkuuList
        emptyWhileLoading
        pagination={false}
        exporter={false}
        {...reactAdminProps}
        className={classes.list}
      >
        <Datagrid rowClick="show" {...datagridProps} bulkActionButtons={false}>
          {children}
        </Datagrid>
      </KukkuuList>
    </>
  );
};

export default KukkuuListPage;
