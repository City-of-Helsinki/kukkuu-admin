import React, { ReactElement } from 'react';
import { Create, CreateProps } from 'react-admin';

import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';

type Props = {
  pageTitle: string;
  reactAdminProps?: Omit<CreateProps, 'children'>;
  children: ReactElement;
};

const KukkuuCreatePage = ({ children, pageTitle, reactAdminProps }: Props) => {
  return (
    <KukkuuPageLayout pageTitle={pageTitle}>
      <Create {...reactAdminProps}>{children}</Create>
    </KukkuuPageLayout>
  );
};

export default KukkuuCreatePage;
