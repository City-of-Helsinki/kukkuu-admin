import React, { ReactNode } from 'react';
import { Datagrid, ResourceComponentPropsWithId } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import KukkuuList from '../kukkuuList/KukkuuList';
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
  children: ReactNode;
  reactAdminProps: ResourceComponentPropsWithId;
};

const KukkuuListPage = ({ pageTitle, children, reactAdminProps }: Props) => {
  const classes = useStyles();

  return (
    <>
      <KukkuuPageTitle title={pageTitle} />
      <KukkuuList
        bulkActionButtons={false}
        pagination={false}
        exporter={false}
        {...reactAdminProps}
        className={classes.list}
      >
        <Datagrid rowClick="show">{children}</Datagrid>
      </KukkuuList>
    </>
  );
};

export default KukkuuListPage;
