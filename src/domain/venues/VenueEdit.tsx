import React, { useState } from 'react';
import {
  Edit,
  TextInput,
  useTranslate,
  SimpleForm,
  required,
} from 'react-admin';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';

const VenueEditTitle = ({ record }: any) => {
  return (
    // TODO make translatable
    <span>{`Muokkaa tapahtumapaikkaa ${record.translations.FI.name}`}</span>
  );
};

const VenueEdit = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Edit title={<VenueEditTitle />} {...props}>
      <SimpleForm validate={validateVenue}>
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
    </Edit>
  );
};

export default VenueEdit;
