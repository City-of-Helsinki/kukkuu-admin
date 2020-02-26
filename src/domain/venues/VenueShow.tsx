import React from 'react';
import { Show, SimpleShowLayout, TextField, useTranslate } from 'react-admin';

import LanguageTabs from '../../common/components/languageTab/LanguageTabs';

const VenueTitle = ({ record }: { record?: any }) => {
  return <span>{record ? `${record.translations.FI.name}` : ''}</span>;
};

const VenueShow = (props: any) => {
  const translate = useTranslate();

  return (
    <LanguageTabs>
      {(selectedLocale: string) => {
        const translation = `translations.${selectedLocale}`;
        return (
          <Show title={<VenueTitle />} {...props}>
            <SimpleShowLayout>
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
            </SimpleShowLayout>
          </Show>
        );
      }}
    </LanguageTabs>
  );
};

export default VenueShow;
