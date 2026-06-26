import React from 'react';
import { type DatagridProps, type ListProps, Datagrid } from 'react-admin';

import KukkuuList from './KukkuuList';
import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';

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
  return (
    <>
      <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>
      <KukkuuList
        emptyWhileLoading
        pagination={false}
        exporter={false}
        {...(reactAdminProps as any)}
        sx={{
          '& > .MuiToolbar-root': {
            marginTop: '-24px',
          },
        }}
      >
        <Datagrid rowClick="show" {...datagridProps} bulkActionButtons={false}>
          {children}
        </Datagrid>
      </KukkuuList>
    </>
  );
};

export default KukkuuListPage;
