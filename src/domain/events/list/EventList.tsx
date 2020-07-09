import React from 'react';
import {
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
  NumberField,
  SelectField,
  DateField,
  FunctionField,
} from 'react-admin';
import { CardHeader } from '@material-ui/core';

import { getTranslatedField } from '../../../common/translation/TranslationUtils';
import { participantsPerInviteChoices } from '../choices';
import KukkuuList from '../../../common/components/kukkuuList/KukkuuList';
import { Events_events_edges_node as Event } from '../../../api/generatedTypes/Events';

const EventList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <>
      <CardHeader title={translate('events.list.title')} />
      <KukkuuList bulkActionButtons={false} {...props}>
        <Datagrid rowClick="show">
          <TextField
            source={getTranslatedField('name', locale)}
            label={translate('events.fields.name.label')}
          />
          <SelectField
            source="participantsPerInvite"
            label={translate('events.fields.participantsPerInvite.label')}
            choices={participantsPerInviteChoices}
          />
          <NumberField
            source="duration"
            label={translate('events.fields.duration.label')}
          />
          <FunctionField
            label="events.fields.totalCapacity.label"
            textAlign="right"
            render={(record: Event) =>
              `${
                record.capacityPerOccurrence * record.occurrences.edges.length
              }`
            }
          />
          <NumberField
            source="occurrences.edges.length"
            label="events.fields.numOfOccurrences.label"
          />
          <DateField
            source={`publishedAt`}
            label={translate('events.fields.publishedAt.label')}
            showTime={true}
            locales={locale}
          />
        </Datagrid>
      </KukkuuList>
    </>
  );
};

export default EventList;
