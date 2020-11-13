import React from 'react';
import {
  ResourceComponentPropsWithId,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import KukkuuDetailPage from '../../../common/components/kukkuuDetailPage/KukkuuDetailPage';
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

  return (
    <TopToolbar className={classes.toolbar}>
      <CreateButton
        basePath="events"
        label={t('eventGroups.actions.addEvent.do')}
      />
      <EditButton basePath="event-groups" />
      {data && <PublishEventGroupButton basePath={basePath} record={data} />}
    </TopToolbar>
  );
};

const EventGroupsDetail = (props: ResourceComponentPropsWithId) => {
  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={props}
      actions={<EventGroupsDetailActions />}
    >
      <SimpleShowLayout>
        <TextField source="name" label="Temporary" />
      </SimpleShowLayout>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
