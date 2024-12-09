import React from 'react';
import {
  EditButton,
  TopToolbar,
  usePermissions,
  useRecordContext,
  useResourceContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';

import type { Permissions } from '../../authentication/authProvider';
import type { AdminEvent } from '../types/EventTypes';
import EventReadyToggle from './EventReadyToggle';
import EventPublishButton from './EventPublishButton';

const useStyles = makeStyles(() => ({
  toolbar: {
    display: 'flex',
  },
  isReadyToggle: {
    marginLeft: 'auto',
  },
}));

const EventShowActions = () => {
  const record = useRecordContext<AdminEvent>();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  const hasEventGroup = Boolean(record?.eventGroup);
  const isPublished = Boolean(record?.publishedAt);
  const classes = useStyles();
  const { permissions } = usePermissions<Permissions>();

  const canPublish = Boolean(
    permissions?.canPublishWithinProject?.(record?.project?.id)
  );

  return (
    <TopToolbar>
      <EditButton record={record} />
      {record && !hasEventGroup && !isPublished && canPublish && (
        <EventPublishButton basePath={basePath} />
      )}
      {record && hasEventGroup && !isPublished && (
        <EventReadyToggle className={classes.isReadyToggle} />
      )}
    </TopToolbar>
  );
};

export default EventShowActions;
