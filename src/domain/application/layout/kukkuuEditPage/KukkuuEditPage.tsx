import React, { ReactElement } from 'react';
import { ResourceComponentPropsWithId } from 'react-admin';

import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuEdit from '../kukkuuEdit/KukkuuEdit';

type Props = {
  reactAdminProps: ResourceComponentPropsWithId;
  children: ReactElement;
  pageTitleSource: string;
};

const KukkuuEditPage = ({
  children,
  reactAdminProps,
  pageTitleSource,
}: Props) => {
  return (
    <KukkuuPageLayout
      pageTitleSource={pageTitleSource}
      reactAdminProps={reactAdminProps}
    >
      <KukkuuEdit undoable={false} actions={<></>} {...reactAdminProps}>
        {children}
      </KukkuuEdit>
    </KukkuuPageLayout>
  );
};

export default KukkuuEditPage;
