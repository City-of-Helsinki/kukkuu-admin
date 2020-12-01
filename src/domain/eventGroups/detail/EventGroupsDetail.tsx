import React from 'react';
import {
  ResourceComponentPropsWithId,
  TopToolbar,
  useTranslate,
  CreateButton,
  EditButton,
  TextField,
  NumberField,
  SelectField,
  FunctionField,
  Record,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import { EventGroup_eventGroup_events_edges_node as EventNode } from '../../../api/generatedTypes/EventGroup';
import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import LocalDataGrid from '../../../common/components/localDataGrid/LocalDataGrid';
import { participantsPerInviteChoices } from '../../events/choices';
import { countCapacity, countEnrollments } from '../../events/utils';
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

const EventGroupsDetail = (props: ResourceComponentPropsWithId) => {
  const { history } = props;
  const t = useTranslate();

  const handleRowClick = (record?: Record) => {
    history?.push(`/events/${record?.id}/show`);
  };

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={{
        ...props,
        actions: <EventGroupsDetailActions />,
      }}
      layout={KukkuuPageLayout}
      breadcrumbs={[
        {
          label: t('eventsAndEventGroups.list.label'),
          link: '/events-and-event-groups',
        },
      ]}
    >
      <LocalDataGrid source="events" rowClick={handleRowClick}>
        <TextField source="name" label={t('events.fields.name.label')} />
        <SelectField
          source="participantsPerInvite"
          label={t('events.fields.participantsPerInvite.label')}
          choices={participantsPerInviteChoices}
        />
        <NumberField
          source="duration"
          label={t('events.fields.duration.label')}
        />
        <FunctionField
          label="events.fields.totalCapacity.label"
          textAlign="right"
          render={(record?: Record) => countCapacity(record as EventNode)}
        />
        <NumberField
          source="occurrences.edges.length"
          label="events.fields.numOfOccurrences.label"
        />
        <FunctionField
          label="events.fields.numOfEnrolments.label"
          textAlign="right"
          render={(record?: Record) => countEnrollments(record as EventNode)}
        />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
