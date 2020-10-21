import React, { ReactElement } from 'react';
import { EditProps, useGetOne } from 'react-admin';
import { CardHeader, Grid } from '@material-ui/core';

import KukkuuEdit from '../../../common/components/kukkuuEdit/KukkuuEdit';

type Props = {
  reactAdminProps: EditProps;
  children: ReactElement;
};

const EventEdit = ({ children, reactAdminProps }: Props) => {
  const { data } = useGetOne(
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    reactAdminProps.resource,
    reactAdminProps.id
  );

  return (
    <>
      <CardHeader title={data?.subject || ''} />
      <Grid container direction="column" xs={6} item={true}>
        <KukkuuEdit undoable={false} actions={<></>} {...reactAdminProps}>
          {children}
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
