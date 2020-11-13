import React from 'react';
import {
  ResourceComponentPropsWithId,
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
  TextField,
  NumberField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import LocalDataGrid from '../../../common/components/localDataGrid/LocalDataGrid';
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
  const t = useTranslate();

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={props}
      actions={<EventGroupsDetailActions />}
      layout={KukkuuPageLayout}
      breadcrumbs={[
        {
          label: t('eventsAndEventGroups.list.label'),
          link: '/events-and-event-groups',
        },
      ]}
    >
      <LocalDataGrid source="events">
        <TextField source="name" label="Name" />
        <NumberField source="participantCount" label="Participant Count" />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
