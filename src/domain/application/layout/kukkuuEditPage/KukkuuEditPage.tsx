import React from 'react';
import type { EditProps } from 'react-admin';

import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuEdit from './KukkuuEdit';
import { ProjectContextGuard } from '../../../projects/components/ProjectContextGuard';

type Props = {
  reactAdminProps?: Omit<EditProps, 'children'>;
  children: React.ReactNode;
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
        <ProjectContextGuard>{children}</ProjectContextGuard>
      </KukkuuEdit>
    </KukkuuPageLayout>
  );
};

export default KukkuuEditPage;
