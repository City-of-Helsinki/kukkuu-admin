import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  required,
} from 'react-admin';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';

const VenueCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Create title={translate('venues.create.title')} {...props}>
      <SimpleForm redirect="show" validate={validateVenue}>
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <TextInput
          source={`${translation}.name`}
          label={translate('venues.fields.name.label')}
          validate={selectedLanguage === Language.FI ? required() : null}
        />
        <TextInput
          source={`${translation}.address`}
          label={translate('venues.fields.address.label')}
          multiline
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
