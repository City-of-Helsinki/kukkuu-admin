import React, { useState } from 'react';
import { Show, TextField, useTranslate, SimpleShowLayout } from 'react-admin';
import { CardHeader } from '@material-ui/core';

import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { Language } from '../../api/generatedTypes/globalTypes';

const VenueTitle = ({
  basePath,
  record,
}: {
  basePath?: string;
  record?: any;
}) => {
  return <CardHeader title={record ? `${record.translations.FI.name}` : ''} />;
};

const VenueShow = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Show {...props}>
      <SimpleShowLayout>
        <VenueTitle />
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
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
          source={`${translation}.additionalInfo`}
          label={translate('venues.fields.additionalInfo.label')}
        />
        <TextField
          source={`${translation}.wcAndFacilities`}
          label={translate('venues.fields.wcAndFacilities.label')}
        />
      </SimpleShowLayout>
    </Show>
  );
};

export default VenueShow;
