import React, { ComponentType, ReactElement } from 'react';
import { ResourceComponentPropsWithId, useGetOne, Record } from 'react-admin';
import omit from 'lodash/omit';

import { Crumb } from '../../../../common/components/breadcrumbs/Breadcrumbs';
import { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';
import KukkuuCardPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuShow from './KukkuuShow';

type Props = {
  children: ReactElement;
  reactAdminProps: ResourceComponentPropsWithId;
  pageTitleSource: string;
  actions?: ReactElement;
  layout?: ComponentType<KukkuuLayoutProps>;
  breadcrumbs?: ((data?: Record) => Crumb[]) | Crumb[];
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  reactAdminProps,
  actions,
  layout: Layout = KukkuuCardPageLayout,
  breadcrumbs,
}: Props) => {
  const { data } = useGetOne(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    reactAdminProps.resource,
    reactAdminProps.id
  );

  const crumbs =
    typeof breadcrumbs === 'function' ? breadcrumbs(data) : breadcrumbs;

  return (
    <Layout
      pageTitleSource={pageTitleSource}
      reactAdminProps={reactAdminProps}
      breadcrumbs={crumbs}
    >
      <KukkuuShow actions={actions} {...omit(reactAdminProps, 'hasShow')}>
        {children}
      </KukkuuShow>
    </Layout>
  );
};

export default KukkuuDetailPage;
