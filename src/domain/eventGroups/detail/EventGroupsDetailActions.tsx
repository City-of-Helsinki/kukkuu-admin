import React from 'react';
import {
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
} from 'react-admin';
import { makeStyles } from '@mui/material';

import PublishEventGroupButton from './PublishEventGroupButton';
import {
  EventGroupEventsPublishStatusEnum,
  getEventGroupPublishStatus,
} from '../utils';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}`,
    },
  },
}));

const EventGroupsDetailActions = ({ data, basePath, permissions }: any) => {
  const t = useTranslate();
  const classes = useStyles();
  const publishStatus = getEventGroupPublishStatus(data);
  const canPublish = permissions?.canPublishWithinProject(data?.project?.id);
  const canManageEventGroups = permissions?.canManageEventGroupsWithinProject(
    data?.project?.id
  );
  const showPublishButton =
    data &&
    [
      EventGroupEventsPublishStatusEnum.ReadyForFirstPublish,
      EventGroupEventsPublishStatusEnum.ReadyForRepublish,
    ].includes(publishStatus) &&
    canPublish;

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        to={`/events/create?eventGroupId=${data?.id}`}
        label={t('eventGroups.actions.addEvent.do')}
      />
      {canManageEventGroups && (
        <EditButton basePath="/event-groups" record={data} />
      )}
      {showPublishButton && (
        <PublishEventGroupButton
          basePath={basePath}
          record={data}
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
