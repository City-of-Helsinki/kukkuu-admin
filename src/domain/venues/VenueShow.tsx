import React from 'react';
import {
  Show,
  TabbedShowLayout,
  TextField,
  Tab,
  useTranslate,
} from 'react-admin';

import { CONTENT_LANGUAGES } from '../../common/constants';

const VenueTitle = ({ record }: { record?: any }) => {
  return <span>{record ? `${record.translations.FI.name}` : ''}</span>;
};

const VenueShow = (props: any) => {
  const tabs: Array<typeof TextField> = [];
  const translate = useTranslate();
  for (const language of CONTENT_LANGUAGES) {
    const translation = `translations.${language}`;
    tabs.push(
      <Tab label={translate(`common.tab.${language}.label`)} key={language}>
        <TextField
          source={`${translation}.name`}
          label={translate('venues.fields.name.label')}
        />
        <TextField
          source={`${translation}.address`}
          label={translate('venues.fields.address.label')}
        />
        <TextField
          source={`${translation}.description`}
          label={translate('venues.fields.description.label')}
        />
        <TextField
          source={`${translation}.accessibilityInfo`}
          label={translate('venues.fields.accessibilityInfo.label')}
        />
        <TextField
          source={`${translation}.arrivalInstructions`}
          label={translate('venues.fields.arrivalInstructions.label')}
        />
        <TextField
          source={`${translation}.additionalInformation`}
          label={translate('venues.fields.additionalInformation.label')}
        />
      </Tab>
    );
  }
  return (
    <Show title={<VenueTitle />} {...props}>
      <TabbedShowLayout>{tabs}</TabbedShowLayout>
    </Show>
  );
};

export default VenueShow;
