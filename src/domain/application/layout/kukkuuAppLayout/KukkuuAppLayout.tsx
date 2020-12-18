import React from 'react';
import { Layout } from 'react-admin';

import KukkuuAppBar from '../../../../common/components/appBar/KukkuuAppBar';

const KukkuuLayout = (props: any) => (
  <Layout {...props} appBar={KukkuuAppBar} />
);

export default KukkuuLayout;
