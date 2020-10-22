import React, { ReactElement } from 'react';
import {
  EditProps,
  ResourceComponentPropsWithId,
  useGetOne,
} from 'react-admin';
import { Grid, makeStyles } from '@material-ui/core';
import get from 'lodash/get';

import KukkuuPageTitle from '../kukkuuPageTitle/KukkuuPageTitle';

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

  return <KukkuuPageTitle title={get(data, source)} />;
};

const useStyles = makeStyles({
  pageWrapper: {
    '& .MuiToolbar-root': {
      paddingTop: 0,
    },
  },
});

type Props = {
  reactAdminProps: EditProps;
  children: ReactElement;
  pageTitle?: string;
  pageTitleSource?: string;
};

const KukkuuPageLayout = ({
  children,
  reactAdminProps,
  pageTitleSource,
  pageTitle,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.pageWrapper}>
      {pageTitleSource && (
        <TitleFromSource
          source={pageTitleSource}
          reactAdminProps={reactAdminProps}
        />
      )}
      {!pageTitleSource && <KukkuuPageTitle title={pageTitle} />}
      <Grid container direction="column" xs={6} item={true}>
        {children}
      </Grid>
    </div>
  );
};

export default KukkuuPageLayout;
