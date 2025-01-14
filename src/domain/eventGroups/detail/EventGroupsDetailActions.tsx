import React from 'react';
import {
  TopToolbar,
  CreateButton,
  EditButton,
  usePermissions,
  useResourceContext,
  useRecordContext,
} from 'react-admin';
import { makeStyles } from '@mui/styles';

import PublishEventGroupButton from './PublishEventGroupButton';
import {
  EventGroupEventsPublishStatusEnum,
  getEventGroupPublishStatus,
} from '../utils';
import type { Permissions } from '../../authentication/authProvider';
import type { EventGroupNode } from '../../api/generatedTypes/graphql';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}`,
    },
  },
}));

const EventGroupsDetailActions = () => {
  const { permissions } = usePermissions<Permissions>();
  const record = useRecordContext<EventGroupNode>();
  const resource = useResourceContext();
  const basePath = `/${resource}`;
  const classes = useStyles();
  const publishStatus = getEventGroupPublishStatus(record);
  const canPublish = Boolean(
    permissions?.canPublishWithinProject?.(record?.project?.id)
  );
  const canManageEventGroups = Boolean(
    permissions?.canManageEventGroupsWithinProject?.(record?.project?.id)
  );
  const showPublishButton =
    record &&
    [
      EventGroupEventsPublishStatusEnum.ReadyForFirstPublish,
      EventGroupEventsPublishStatusEnum.ReadyForRepublish,
    ].includes(publishStatus) &&
    canPublish;

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        to={`/events/create?eventGroupId=${record?.id}`}
        label={'eventGroups.actions.addEvent.do'}
      />
      {canManageEventGroups && <EditButton record={record} />}
      {showPublishButton && (
        <PublishEventGroupButton
          basePath={basePath}
          buttonLabel={
            publishStatus ===
            EventGroupEventsPublishStatusEnum.ReadyForRepublish
              ? 'eventGroups.actions.publish.redo'
              : 'eventGroups.actions.publish.do'
          }
        />
      )}
    </TopToolbar>
  );
};

export default EventGroupsDetailActions;
