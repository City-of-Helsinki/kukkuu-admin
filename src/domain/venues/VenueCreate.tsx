import React, { useState } from 'react';
import { Create, TextInput, useTranslate, SimpleForm } from 'react-admin';

import { Language as LanguageEnum } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';

const VenueCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(LanguageEnum.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Create title={'Luo uusi tapahtumapaikka'} {...props}>
      <SimpleForm redirect="show">
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <TextInput
          source={`${translation}.name`}
          label={translate('venues.fields.name.label')}
        />
        <TextInput
          source={`${translation}.description`}
          label={translate('venues.fields.description.label')}
          multiline
        />
        <TextInput
          source={`${translation}.accessibilityInfo`}
          label={translate('venues.fields.accessibilityInfo.label')}
          multiline
        />
        <TextInput
          source={`${translation}.arrivalInstructions`}
          label={translate('venues.fields.arrivalInstructions.label')}
          multiline
        />
        <TextInput
          source={`${translation}.additionalInfo`}
          label={translate('venues.fields.additionalInfo.label')}
          multiline
        />
      </SimpleForm>
    </Create>
  );
};

export default VenueCreate;
