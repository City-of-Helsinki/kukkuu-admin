import React from 'react';
import type { EmptyProps } from 'react-admin';
import { Empty as RaEmpty } from 'react-admin';

import styles from './empty.module.css';
import { EventsAndEventGroupsListManagementButtonGroup } from './ManagementButtonGroup';

const Empty = (props: EmptyProps) => {
  return (
    <div className={styles.container}>
      <RaEmpty {...props} hasCreate={false} />
      <div className={styles.actions}>
        <EventsAndEventGroupsListManagementButtonGroup variant="contained" />
      </div>
    </div>
  );
};

export default Empty;
