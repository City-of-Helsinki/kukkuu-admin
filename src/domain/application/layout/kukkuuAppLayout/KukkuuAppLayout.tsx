import React from 'react';
import { type LayoutProps, Layout } from 'react-admin';

import KukkuuAppBar from '../../../../common/components/appBar/KukkuuAppBar';

const KukkuuLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={KukkuuAppBar} />
);

export default KukkuuLayout;
