import React from 'react';
import {
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import PublishEventGroupButton from './PublishEventGroupButton';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}px`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const EventGroupsDetailActions = ({ data, basePath }: any) => {
  const t = useTranslate();
  const classes = useStyles();

  const isPublished = Boolean(data?.publishedAt);

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        to={`/events/create?eventGroupId=${data?.id}`}
        label={t('eventGroups.actions.addEvent.do')}
      />
      <EditButton basePath="/event-groups" record={data} />
      {data && !isPublished && (
        <PublishEventGroupButton basePath={basePath} record={data} />
      )}
    </TopToolbar>
  );
};

export default EventGroupsDetailActions;
