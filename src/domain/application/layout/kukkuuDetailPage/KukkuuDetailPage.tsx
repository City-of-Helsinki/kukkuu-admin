import React, type { ComponentType, ReactElement, ReactText } from 'react';
import { type RaRecord, type ShowProps , useGetOne, useResourceContext } from 'react-admin';
import omit from 'lodash/omit';
import { useParams } from 'react-router-dom';

import type { Crumb } from '../../../../common/components/breadcrumbs/Breadcrumbs';
import type { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';
import KukkuuCardPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuShow from './KukkuuShow';

type Props = {
  children: ReactElement;
  reactAdminProps?: Omit<ShowProps, 'children' | 'hasShow'>;
  pageTitleSource?: string;
  pageTitle?: string | ((record?: RaRecord) => ReactText | undefined);
  layout?: ComponentType<KukkuuLayoutProps>;
  breadcrumbs?: ((data?: RaRecord) => Crumb[]) | Crumb[];
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  pageTitle,
  reactAdminProps,
  layout: Layout = KukkuuCardPageLayout,
  breadcrumbs,
}: Props) => {
  const resource = useResourceContext();
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useGetOne(resource!, {
    id,
  });

  const crumbs =
    typeof breadcrumbs === 'function' ? breadcrumbs(data) : breadcrumbs;

  return (
    <Layout
      pageTitleSource={pageTitleSource}
      pageTitle={pageTitle}
      breadcrumbs={crumbs}
    >
      <KukkuuShow {...omit(reactAdminProps, 'hasShow')}>{children}</KukkuuShow>
    </Layout>
  );
};

export default KukkuuDetailPage;
