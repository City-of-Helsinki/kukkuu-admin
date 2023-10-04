import React from 'react';
import {
  EditButton,
  TopToolbar,
  usePermissions,
  useRecordContext,
  useResourceContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';

import { Permissions } from '../../authentication/authProvider';
import { AdminEvent } from '../types/EventTypes';
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

  const canPublish = permissions?.canPublishWithinProject(record?.project?.id);

  return (
    <TopToolbar>
      <EditButton record={record} />
      {record && !hasEventGroup && !isPublished && canPublish && (
        <EventPublishButton basePath={basePath} record={record} />
      )}
      {record && hasEventGroup && !isPublished && (
        <EventReadyToggle className={classes.isReadyToggle} record={record} />
      )}
    </TopToolbar>
  );
};

export default EventShowActions;
