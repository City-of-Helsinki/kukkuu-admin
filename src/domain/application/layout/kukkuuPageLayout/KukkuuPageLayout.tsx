import type { ReactElement } from 'react';
import React from 'react';
import { type RaRecord, useGetOne, useResourceContext } from 'react-admin';
import { makeStyles } from '@mui/styles';
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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useGetOne(resource, {
    id,
  });

  const pageTitle = (() => {
    if (typeof pageTitleSource === 'function') {
      return pageTitleSource(data);
    }

    return get(data, pageTitleSource);
  })();

  return <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>;
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    '& .MuiToolbar-root': {
      paddingTop: 0,
    },
  },
  breadCrumbs: {
    position: 'absolute',
    top: theme.spacing(9),
  },
}));

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
  const classes = useStyles();

  const isSourcePageTitle = Boolean(pageTitleSource);
  const isFunctionPageTitle = typeof pageTitle === 'function';
  const isPlainPageTitle =
    !isSourcePageTitle && !isFunctionPageTitle && Boolean(pageTitle);

  return (
    <div className={classes.pageWrapper}>
      {breadcrumbs && (
        <BreadCrumbs className={classes.breadCrumbs} crumbs={breadcrumbs} />
      )}
      {(isSourcePageTitle || isFunctionPageTitle) && (
        <TitleWithRecord pageTitle={pageTitleSource ?? pageTitle ?? ''} />
      )}
      {isPlainPageTitle && <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>}
      {children}
    </div>
  );
};

export default KukkuuPageLayout;
