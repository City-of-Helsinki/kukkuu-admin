import type { ComponentType, ReactElement } from 'react';
import {
  type RaRecord,
  type ShowProps,
  useGetOne,
  useResourceContext,
} from 'react-admin';
import { useParams } from 'react-router-dom';

import type { Crumb } from '../../../../common/components/breadcrumbs/Breadcrumbs';
import type { KukkuuLayoutProps } from '../kukkuuPageLayout/KukkuuPageLayout';
import KukkuuCardPageLayout from '../kukkuuCardPageLayout/KukkuuCardPageLayout';
import KukkuuShow from './KukkuuShow';

type Props = {
  children: ReactElement;
  reactAdminProps?: Omit<ShowProps, 'children' | 'hasShow'>;
  pageTitleSource?: string;
  pageTitle?: string | ((record?: RaRecord) => string);
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
  const { data: fetchedRecord } = useGetOne(resource!, {
    id,
  });
  // Guard against a stale/in-flight fetch for a previous id resolving after
  // the URL has already moved on to a new record (e.g. right after a
  // redirect) — react-admin's own <Show> has the same guard internally.
  // eslint-disable-next-line eqeqeq
  const data = fetchedRecord?.id == id ? fetchedRecord : undefined;

  const crumbs =
    typeof breadcrumbs === 'function' ? breadcrumbs(data) : breadcrumbs;

  return (
    <Layout
      pageTitleSource={pageTitleSource}
      pageTitle={pageTitle}
      breadcrumbs={crumbs}
    >
      <KukkuuShow {...reactAdminProps}>{children}</KukkuuShow>
    </Layout>
  );
};

export default KukkuuDetailPage;
