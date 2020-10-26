import React, { ReactElement } from 'react';
import {
  EditProps,
  ResourceComponentPropsWithId,
  useGetOne,
} from 'react-admin';
import { Grid, makeStyles } from '@material-ui/core';
import get from 'lodash/get';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';
import BreadCrumbs, { CrumbConfig } from './BreadCrumbs';

type TitleFromSourceProps = {
  source: string;
  reactAdminProps: ResourceComponentPropsWithId;
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

type Props = {
  reactAdminProps: EditProps;
  children: ReactElement;
  pageTitle?: string;
  pageTitleSource?: string;
  breadcrumbs?: boolean | CrumbConfig[];
};

const KukkuuPageLayout = ({
  children,
  reactAdminProps,
  pageTitleSource,
  pageTitle,
  breadcrumbs,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      {breadcrumbs && (
        <BreadCrumbs
          reactAdminProps={reactAdminProps}
          className={classes.breadCrumbs}
        />
      )}
      {pageTitleSource && (
        <TitleFromSource
          source={pageTitleSource}
          reactAdminProps={reactAdminProps}
        />
      )}
      {!pageTitleSource && <KukkuuPageTitle>{pageTitle}</KukkuuPageTitle>}
      <Grid container direction="column" xs={6} item={true}>
        {children}
      </Grid>
    </div>
  );
};

export default KukkuuPageLayout;
