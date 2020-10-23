import React, { ReactElement } from 'react';
import { ResourceComponentPropsWithId } from 'react-admin';
import omit from 'lodash/omit';

import KukkuuShow from '../kukkuuShow/KukkuuShow';
import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';

type Props = {
  children: ReactElement;
  reactAdminProps: ResourceComponentPropsWithId;
  pageTitleSource: string;
  actions: ReactElement;
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  reactAdminProps,
  actions,
}: Props) => {
  return (
    <KukkuuPageLayout
      pageTitleSource={pageTitleSource}
      reactAdminProps={reactAdminProps}
      breadcrumbs
    >
      <KukkuuShow actions={actions} {...omit(reactAdminProps, 'hasShow')}>
        {children}
      </KukkuuShow>
    </KukkuuPageLayout>
  );
};

export default KukkuuDetailPage;
