import React from 'react';
import { EditButton, TopToolbar } from 'react-admin';
import { makeStyles } from '@material-ui/core';

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

type Props = {
  basePath?: string;
  data?: AdminEvent;
};

const EventShowActions = ({ basePath, data }: Props) => {
  const hasEventGroup = Boolean(data?.eventGroup);
  const isPublished = Boolean(data?.publishedAt);
  const classes = useStyles();

  return (
    <TopToolbar>
      <EditButton basePath={basePath} record={data} />
      {data && !hasEventGroup && !isPublished && (
        <EventPublishButton basePath={basePath} record={data} />
      )}
      {data && hasEventGroup && !isPublished && (
        <EventReadyToggle className={classes.isReadyToggle} record={data} />
      )}
    </TopToolbar>
  );
};

export default EventShowActions;
