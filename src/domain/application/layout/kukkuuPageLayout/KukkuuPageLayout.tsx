import React, { ReactElement, ReactText } from 'react';
import { EditProps, useGetOne } from 'react-admin';
import { makeStyles } from '@mui/styles';
import get from 'lodash/get';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';
import BreadCrumbs, {
  Crumb,
} from '../../../../common/components/breadcrumbs/Breadcrumbs';
import { RecordType } from '../../../../api/types';

type TitleWithRecordProps = {
  pageTitle: string | ((record?: RecordType) => ReactText);
  reactAdminProps: EditProps;
};

const TitleWithRecord = ({
  pageTitle: pageTitleSource,
  reactAdminProps,
}: TitleWithRecordProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = useGetOne(reactAdminProps.resource!, {
    id: reactAdminProps.id,
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
  reactAdminProps: EditProps;
  children: ReactElement;
  pageTitle?: string | ((record?: RecordType) => ReactText | undefined);
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
