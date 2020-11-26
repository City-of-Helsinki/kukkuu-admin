import React, { ComponentType, ReactElement, ReactText } from 'react';
import { useGetOne, Record, ShowProps } from 'react-admin';
import omit from 'lodash/omit';

import { Crumb } from '../../../../common/components/breadcrumbs/Breadcrumbs';
import { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';
import KukkuuCardPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuShow from './KukkuuShow';

type Props = {
  children: ReactElement;
  reactAdminProps: ShowProps;
  pageTitleSource?: string;
  pageTitle?: string | ((record?: Record) => ReactText | undefined);
  layout?: ComponentType<KukkuuLayoutProps>;
  breadcrumbs?: ((data?: Record) => Crumb[]) | Crumb[];
};

const KukkuuDetailPage = ({
  children,
  pageTitleSource,
  pageTitle,
  reactAdminProps,
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
      pageTitle={pageTitle}
      reactAdminProps={reactAdminProps}
      breadcrumbs={crumbs}
    >
      <KukkuuShow {...omit(reactAdminProps, 'hasShow')}>{children}</KukkuuShow>
    </Layout>
  );
};

export default KukkuuDetailPage;
