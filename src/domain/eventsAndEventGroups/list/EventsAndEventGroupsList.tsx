import React, { ReactText } from 'react';
import {
  TextField,
  useTranslate,
  NumberField,
  FunctionField,
  Record,
  TopToolbar,
  CreateButton,
  ReactAdminComponentProps,
} from 'react-admin';
import { makeStyles } from '@material-ui/core';

import {
  EventsAndEventGroups_eventsAndEventGroups_edges_node_EventGroupNode as EventGroupNode,
  EventsAndEventGroups_eventsAndEventGroups_edges_node as EventOrEventGroupNode,
} from '../../../api/generatedTypes/EventsAndEventGroups';
import { EventFragment as EventNode } from '../../../api/generatedTypes/EventFragment';
import RelayList from '../../../api/relayList';
import { toDateTimeString } from '../../../common/utils';
import PublishedField from '../../../common/components/publishedField/PublishedField';
import KukkuuListPage from '../../application/layout/kukkuuListPage/KukkuuListPage';
import { countCapacity, countOccurrences } from '../../events/utils';

const useEventsAndEventGroupsListToolbarStyles = makeStyles((theme) => ({
  toolbar: {
    margin: `0 -${theme.spacing(1)}px`,
    '& > *': {
      margin: `0 ${theme.spacing(1)}px`,
    },
  },
}));

const EventsAndEventGroupsListToolbar = ({ data }: any) => {
  const t = useTranslate();
  const classes = useEventsAndEventGroupsListToolbarStyles();

  return (
    <TopToolbar className={classes.toolbar}>
      {data && (
        <CreateButton
          basePath="event-groups"
          label={t('eventGroups.actions.create.do')}
        />
      )}
      {data && (
        <CreateButton basePath="events" label={t('events.actions.create')} />
      )}
    </TopToolbar>
  );
};

const EvenList = RelayList<EventNode>();

function when(
  record: EventOrEventGroupNode,
  whenEvent: (record: EventNode) => any,
  whenEventGroup: (record: EventGroupNode) => any
): any {
  const isEventGroup = record.hasOwnProperty('events');

  if (isEventGroup) {
    const eventGroup = record as EventGroupNode;

    return whenEventGroup(eventGroup);
  } else {
    const event = record as EventNode;

    return whenEvent(event);
  }
}

const useStyles = makeStyles((theme) => ({
  uppercase: {
    textTransform: 'uppercase',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const EventsAndEventGroupsList = (props: ReactAdminComponentProps) => {
  const translate = useTranslate();
  const classes = useStyles();

  const handleRowClick = (id: ReactText, basePath: string, record: Record) => {
    const isEvent = !record.hasOwnProperty('events');
    const isEventGroup = record.hasOwnProperty('events');

    if (isEvent) {
      return `/events/${id}/show`;
    }

    if (isEventGroup) {
      return `/event-groups/${id}/show`;
    }

    return '';
  };

  return (
    <KukkuuListPage
      pageTitle={translate('events.list.title')}
      reactAdminProps={{
        ...props,
        actions: <EventsAndEventGroupsListToolbar />,
      }}
      datagridProps={{
        rowClick: handleRowClick,
      }}
    >
      <TextField
        source="name"
        label={translate('events.fields.name.label')}
        className={classes.bold}
      />
      <FunctionField
        label="eventsAndEventGroups.list.type.label"
        render={(record) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupNode,
            () => translate('eventsAndEventGroups.list.type.event.label'),
            () => translate('eventsAndEventGroups.list.type.eventGroup.label')
          );
        }}
        className={[classes.uppercase, classes.bold].join(' ')}
      />
      <NumberField
        label="eventsAndEventGroups.list.eventCount.label"
        source="events.edges.length"
        emptyText="1"
        className={classes.bold}
      />
      <FunctionField
        label="events.fields.totalCapacity.label"
        textAlign="right"
        render={(record?: Record) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupNode,
            (event: EventNode) => {
              return countCapacity(event);
            },
            (eventGroup: EventGroupNode) => {
              return countCapacity(...EvenList(eventGroup.events).items);
            }
          );
        }}
      />
      <FunctionField
        label="events.fields.numOfOccurrences.label"
        textAlign="right"
        render={(record?: Record) => {
          if (!record) {
            return null;
          }

          return when(
            record as EventOrEventGroupNode,
            (event: EventNode) => {
              return countOccurrences(event);
            },
            (eventGroup: EventGroupNode) => {
              return countOccurrences(...EvenList(eventGroup.events).items);
            }
          );
        }}
      />
      <PublishedField
        label={translate('events.fields.publishedAt.label')}
        source="publishedAt"
        render={(date: Date) =>
          `${translate(
            'events.fields.publishedAt.published.label'
          )} ${toDateTimeString(date)}`
        }
        emptyText={translate('events.fields.publishedAt.values.NOT_PUBLISHED')}
        className={classes.bold}
      />
    </KukkuuListPage>
  );
};

export default EventsAndEventGroupsList;
