import React from 'react';
import {
  ResourceComponentPropsWithId,
  useTranslate,
  TextField,
  NumberField,
  SelectField,
  FunctionField,
  Record,
} from 'react-admin';
import { makeStyles } from '@mui/styles';

import { EventGroup_eventGroup_events_edges_node as EventNode } from '../../../api/generatedTypes/EventGroup';
import KukkuuPageLayout from '../../application/layout/kukkuuPageLayout/KukkuuPageLayout';
import KukkuuDetailPage from '../../application/layout/kukkuuDetailPage/KukkuuDetailPage';
import LocalDataGrid from '../../../common/components/localDataGrid/LocalDataGrid';
import { participantsPerInviteChoices } from '../../events/choices';
import { countCapacity, countEnrollments } from '../../events/utils';
import EventReadyField from './EventReadyField';
import EventGroupsDetailActions from './EventGroupsDetailActions';

const useStyles = makeStyles(() => ({
  center: {
    margin: '0 auto',
    textAlign: 'center',
  },
}));

const EventGroupsDetail = (props: ResourceComponentPropsWithId) => {
  const { history } = props;
  const t = useTranslate();
  const classes = useStyles();

  const handleRowClick = (record?: Record) => {
    history?.push(`/events/${record?.id}/show`);
  };

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={{
        ...props,
        actions: <EventGroupsDetailActions permissions={props.permissions} />,
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
          render={(record?: Record) =>
            countCapacity(record as EventNode) ??
            t('events.fields.totalCapacity.unknown')
          }
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
        <FunctionField
          headerClassName={classes.center}
          label="events.fields.ready.label2"
          render={(record?: Record) => (
            <EventReadyField record={record} className={classes.center} />
          )}
        />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
