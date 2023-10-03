import React, { ReactElement } from 'react';
import { EditProps } from 'react-admin';

import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuEdit from './KukkuuEdit';

type Props = {
  reactAdminProps: EditProps;
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
      <KukkuuEdit mutationMode="pessimistic" {...reactAdminProps}>
        {children}
      </KukkuuEdit>
    </KukkuuPageLayout>
  );
};

export default KukkuuEditPage;
