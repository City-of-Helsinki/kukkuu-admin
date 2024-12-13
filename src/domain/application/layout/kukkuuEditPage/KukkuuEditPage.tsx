import React, type { ReactElement } from 'react';
import type { EditProps } from 'react-admin';

import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuEdit from './KukkuuEdit';

type Props = {
  reactAdminProps?: Omit<EditProps, 'children'>;
  children: ReactElement;
  pageTitleSource: string;
};

const KukkuuEditPage = ({
  children,
  reactAdminProps,
  pageTitleSource,
}: Props) => {
  return (
    <KukkuuPageLayout pageTitleSource={pageTitleSource}>
      <KukkuuEdit mutationMode="pessimistic" {...reactAdminProps}>
        {children}
      </KukkuuEdit>
    </KukkuuPageLayout>
  );
};

export default KukkuuEditPage;
