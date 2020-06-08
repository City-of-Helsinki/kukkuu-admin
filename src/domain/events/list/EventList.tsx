import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  useTranslate,
  useLocale,
  NumberField,
  SelectField,
  DateField,
} from 'react-admin';

import { getTranslatedField } from '../../../common/translation/TranslationUtils';
import { participantsPerInviteChoices } from '../choices';
import Aside from '../../../common/components/aside/Aside';

const EventList = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();

  return (
    <List
      title="events.list.title"
      bulkActionButtons={false}
      aside={<Aside content="events.list.aside.content" />}
      {...props}
    >
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
        <NumberField
          source="capacityPerOccurrence"
          label={translate('events.fields.capacityPerOccurrence.label')}
        />
        <NumberField
          source="occurrences.edges.length"
          label={translate('events.fields.occurrences.label')}
        />
        <DateField
          source={`publishedAt`}
          label={translate('events.fields.publishedAt.label')}
          showTime={true}
          locales={locale}
        />
      </Datagrid>
    </List>
  );
};

export default EventList;
