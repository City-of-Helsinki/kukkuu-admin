import React, { ReactNode } from 'react';
import { Datagrid, ResourceComponentPropsWithId } from 'react-admin';
import { CardHeader } from '@material-ui/core';

import KukkuuList from '../kukkuuList/KukkuuList';

type Props = {
  pageTitle: string;
  children: ReactNode;
  reactAdminProps: ResourceComponentPropsWithId;
};

const KukkuuListPage = ({ pageTitle, children, reactAdminProps }: Props) => {
  return (
    <>
      <CardHeader title={pageTitle} />
      <KukkuuList
        bulkActionButtons={false}
        pagination={false}
        exporter={false}
        {...reactAdminProps}
      >
        <Datagrid rowClick="show">{children}</Datagrid>
      </KukkuuList>
    </>
  );
};

export default KukkuuListPage;
