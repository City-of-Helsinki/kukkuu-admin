import React, { ReactElement } from 'react';
import { EditProps, useGetOne } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import get from 'lodash/get';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';
import BreadCrumbs, {
  Crumb,
} from '../../../../common/components/breadcrumbs/Breadcrumbs';

type TitleFromSourceProps = {
  source: string;
  reactAdminProps: EditProps;
};

const TitleFromSource = ({ source, reactAdminProps }: TitleFromSourceProps) => {
  const { data } = useGetOne(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    reactAdminProps.resource,
    reactAdminProps.id
  );

  return <KukkuuPageTitle>{get(data, source)}</KukkuuPageTitle>;
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
  pageTitle?: string;
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

  return (
    <div className={classes.pageWrapper}>
      {breadcrumbs && (
        <BreadCrumbs className={classes.breadCrumbs} crumbs={breadcrumbs} />
      )}
      {pageTitleSource && (
        <TitleFromSource
          source={pageTitleSource}
          reactAdminProps={reactAdminProps}
        />
      )}
      {!pageTitleSource && <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>}
      {children}
    </div>
  );
};

export default KukkuuPageLayout;
