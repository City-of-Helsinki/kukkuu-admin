import React from 'react';
import { type EmptyProps, Empty as RaEmpty } from 'react-admin';

import { MessagesManagementButtonGroup } from './MessagesManagementButtonGroup';
import styles from './empty.module.css';

const Empty = (props: EmptyProps) => {
  return (
    <div className={styles.container}>
      <RaEmpty {...props} hasCreate={false} />
      <div className={styles.actions}>
        <MessagesManagementButtonGroup variant="contained" />
      </div>
    </div>
  );
};

export default Empty;
