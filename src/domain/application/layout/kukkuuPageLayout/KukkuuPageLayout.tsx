import type { ReactElement } from 'react';
import { type RaRecord, useGetOne, useResourceContext } from 'react-admin';
import Box from '@mui/material/Box';
import get from 'lodash/get';
import { useParams } from 'react-router-dom';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';
import type { Crumb } from '../../../../common/components/breadcrumbs/Breadcrumbs';
import BreadCrumbs from '../../../../common/components/breadcrumbs/Breadcrumbs';

type TitleWithRecordProps = {
  pageTitle: string | ((record?: RaRecord) => string);
};

const TitleWithRecord = ({
  pageTitle: pageTitleSource,
}: TitleWithRecordProps) => {
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

  const pageTitle = (() => {
    if (typeof pageTitleSource === 'function') {
      return pageTitleSource(data);
    }

    return get(data, pageTitleSource);
  })();

  return <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>;
};

export type KukkuuLayoutProps = {
  children: ReactElement;
  pageTitle?: string | ((record?: RaRecord) => string);
  pageTitleSource?: string;
  breadcrumbs?: Crumb[];
};

const KukkuuPageLayout = ({
  children,
  pageTitleSource,
  pageTitle,
  breadcrumbs,
}: KukkuuLayoutProps) => {
  const isSourcePageTitle = Boolean(pageTitleSource);
  const isFunctionPageTitle = typeof pageTitle === 'function';
  const isPlainPageTitle =
    !isSourcePageTitle && !isFunctionPageTitle && Boolean(pageTitle);

  return (
    <Box
      sx={{
        '& .MuiToolbar-root': {
          paddingTop: 0,
        },
      }}
    >
      {breadcrumbs && (
        <Box sx={(theme) => ({ position: 'absolute', top: theme.spacing(9) })}>
          <BreadCrumbs className="" crumbs={breadcrumbs} />
        </Box>
      )}
      {(isSourcePageTitle || isFunctionPageTitle) && (
        <TitleWithRecord pageTitle={pageTitleSource ?? pageTitle ?? ''} />
      )}
      {isPlainPageTitle && <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>}
      {children}
    </Box>
  );
};
export default KukkuuPageLayout;
