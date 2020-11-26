import React, { ReactElement, ReactText } from 'react';
import { EditProps, useGetOne, Record } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import get from 'lodash/get';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';
import BreadCrumbs, {
  Crumb,
} from '../../../../common/components/breadcrumbs/Breadcrumbs';

type TitleWithRecordProps = {
  pageTitle: string | ((record?: Record) => ReactText);
  reactAdminProps: EditProps;
};

const TitleWithRecord = ({
  pageTitle: pageTitleSource,
  reactAdminProps,
}: TitleWithRecordProps) => {
  const { data } = useGetOne(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    reactAdminProps.resource,
    reactAdminProps.id
  );

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
  reactAdminProps: EditProps;
  children: ReactElement;
  pageTitle?: string | ((record?: Record) => ReactText | undefined);
  pageTitleSource?: string;
  breadcrumbs?: Crumb[];
};

const KukkuuPageLayout = ({
  children,
  reactAdminProps,
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
        <TitleWithRecord
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          pageTitle={pageTitleSource || pageTitle}
          reactAdminProps={reactAdminProps}
        />
      )}
      {isPlainPageTitle && <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>}
      {children}
    </div>
  );
};

export default KukkuuPageLayout;
