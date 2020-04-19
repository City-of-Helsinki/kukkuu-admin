import React, { FunctionComponent, useState } from 'react';
import {
  Show,
  TabbedShowLayout,
  TextField,
  Tab,
  useTranslate,
  ImageField,
  NumberField,
  DateField,
  SelectField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  useLocale,
} from 'react-admin';

import { Language } from '../../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { participantsPerInviteChoices } from '../choices';

const EventShow: FunctionComponent = (props: any) => {
  const translate = useTranslate();
  const locale = useLocale();
  const EventTitle = ({ record }: { record?: any }) => {
    return <span>{record ? `${record.translations.FI.name}` : ''}</span>;
  };

  const [language, selectLanguage] = useState(Language.FI);
  return (
    <Show title={<EventTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label={translate('events.show.tab.label')}>
          <LanguageTabs selectedLanguage={language} onSelect={selectLanguage} />
          <ImageField source="image" />
          <TextField
            source={`translations.${language}.name`}
            label={translate('events.fields.name.label')}
          />

          <SelectField
            source="participantsPerInvite"
            label={translate('events.fields.participantsPerInvite.label')}
            choices={participantsPerInviteChoices}
          />

          <NumberField
            source={`duration`}
            label={translate('events.fields.duration.label')}
          />

          <NumberField
            source={`capacityPerOccurrence`}
            label={translate('events.fields.capacityPerOccurrence.label')}
          />

          <DateField
            source={`publishedAt`}
            label={translate('events.fields.publishedAt.label')}
          />
        </Tab>
        <Tab label="events.fields.occurrences.label">
          <ReferenceManyField
            label=" "
            reference="occurrences"
            target="event_id"
          >
            <Datagrid>
              <DateField
                label="occurrences.fields.time.label"
                source="time"
                showTime
                locales={locale}
              />
              <ReferenceField
                label="occurrences.fields.venues.label"
                source="venue.id"
                reference="venues"
              >
                <TextField source="translations.FI.name" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default EventShow;
