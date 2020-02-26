import React, { FunctionComponent } from 'react';
import {
  Show,
  TabbedShowLayout,
  TextField,
  Tab,
  useTranslate,
  ImageField,
  NumberField,
  DateField,
  TabbedShowLayoutTabs,
} from 'react-admin';

import { CONTENT_LANGUAGES } from '../../../common/constants';

const EventShow: FunctionComponent = (props: any) => {
  const translate = useTranslate();
  const EventTitle = ({ record }: { record?: any }) => {
    return <span>{record ? `${record.translations.FI.name}` : ''}</span>;
  };

  return (
    <Show title={<EventTitle />} {...props}>
      <TabbedShowLayout>
        <Tab label={translate('events.show.tab.label')}>
          <TabbedShowLayout>
            {CONTENT_LANGUAGES.map(language => (
              <Tab
                label={translate(`common.tab.${language}.label`)}
                key={language}
                path={language}
              >
                <ImageField source="image" />

                <TextField
                  source={`translations.${language}.name`}
                  label={translate('events.fields.name.label')}
                />

                <TextField
                  source={`participantsPerInvite`}
                  label={translate('events.fields.participantsPerInvite.label')}
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
            ))}
          </TabbedShowLayout>
        </Tab>
        <Tab label="events.fields.occurrences.label"></Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default EventShow;
