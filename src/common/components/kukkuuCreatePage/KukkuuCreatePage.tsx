import React, { ReactElement } from 'react';
import { Create, CreateProps } from 'react-admin';
import { CardHeader, Grid } from '@material-ui/core';

type Props = {
  pageTitle: string;
  reactAdminProps: CreateProps;
  children: ReactElement;
};

const KukkuuCreatePage = ({ children, pageTitle, reactAdminProps }: Props) => {
  return (
    <>
      <CardHeader title={pageTitle} />
      <Grid container direction="column" xs={6} item={true}>
        <Create {...reactAdminProps}>{children}</Create>
      </Grid>
    </>
  );
};

export default KukkuuCreatePage;
