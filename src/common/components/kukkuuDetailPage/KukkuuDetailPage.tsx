import React, { ReactElement } from 'react';
import { ResourceComponentPropsWithId } from 'react-admin';

import KukkuuShow from '../kukkuuShow/KukkuuShow';
import KukkuuPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';

type Props = {
  children: ReactElement;
  reactAdminProps: ResourceComponentPropsWithId;
  pageTitleSource: string;
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  reactAdminProps: { hasShow, ...props },
}: Props) => {
  return (
    <KukkuuPageLayout pageTitleSource={pageTitleSource} reactAdminProps={props}>
      <KukkuuShow {...props}>{children}</KukkuuShow>
    </KukkuuPageLayout>
  );
};

export default KukkuuDetailPage;
