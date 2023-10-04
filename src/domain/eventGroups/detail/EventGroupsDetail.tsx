import React from 'react';
import {
  useTranslate,
  TextField,
  NumberField,
  SelectField,
  FunctionField,
  RaRecord,
} from 'react-admin';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';

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

const EventGroupsDetail = () => {
  const navigate = useNavigate();
  const t = useTranslate();
  const classes = useStyles();
  const handleRowClick = (record?: RaRecord) => {
    navigate(`/events/${record?.id}/show`);
  };

  return (
    <KukkuuDetailPage
      pageTitleSource="name"
      reactAdminProps={{
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
          render={(record?: RaRecord) =>
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
          render={(record?: RaRecord) => countEnrollments(record as EventNode)}
        />
        <FunctionField
          headerClassName={classes.center}
          label="events.fields.ready.label2"
          render={(record?: RaRecord) => (
            <EventReadyField record={record} className={classes.center} />
          )}
        />
      </LocalDataGrid>
    </KukkuuDetailPage>
  );
};

export default EventGroupsDetail;
