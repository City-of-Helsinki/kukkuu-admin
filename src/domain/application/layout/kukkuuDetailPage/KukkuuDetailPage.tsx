import React, { ComponentType, ReactElement } from 'react';
import { ResourceComponentPropsWithId } from 'react-admin';
import omit from 'lodash/omit';

import KukkuuShow from './KukkuuShow';
import { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';
import KukkuuCardPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';

type Props = {
  children: ReactElement;
  reactAdminProps: ResourceComponentPropsWithId;
  pageTitleSource: string;
  actions?: ReactElement;
  layout?: ComponentType<KukkuuLayoutProps>;
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  reactAdminProps,
  actions,
  layout: Layout = KukkuuCardPageLayout,
}: Props) => {
  return (
    <Layout
      pageTitleSource={pageTitleSource}
      reactAdminProps={reactAdminProps}
      breadcrumbs
    >
      <KukkuuShow actions={actions} {...omit(reactAdminProps, 'hasShow')}>
        {children}
      </KukkuuShow>
    </Layout>
  );
};

export default KukkuuDetailPage;
