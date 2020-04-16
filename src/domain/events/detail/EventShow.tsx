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
} from 'react-admin';

import { Language } from '../../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { participantsPerInviteChoices } from '../choices';

const EventShow: FunctionComponent = (props: any) => {
  const translate = useTranslate();
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
        <Tab label="events.fields.occurrences.label"></Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default EventShow;
