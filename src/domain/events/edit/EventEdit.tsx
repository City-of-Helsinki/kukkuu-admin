import React, { useState } from 'react';
import {
  Edit,
  TextInput,
  ImageInput,
  ImageField,
  useTranslate,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
} from 'react-admin';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import { validateVenue } from '../../venues/validations';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateParticipantsPerInvite,
  validateShortDescription,
} from '../validations';
import { participantsPerInviteChoices } from '../choices';

const EventEdit = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  // Stolen https://github.com/marmelab/react-admin/issues/2077#issuecomment-516821629
  // FIXME: Is it really needed?
  function formatImage(value: any) {
    if (!value.image || typeof value.image === 'string') {
      // Value is null or the url string from the backend, wrap it in an object so the form input can handle it
      return { image: value };
    } else {
      // Else a new image is selected which results in a value object already having a preview link under the url key
      return value.image;
    }
  }

  return (
    <Edit title={translate('events.edit.title')} {...props}>
      <SimpleForm redirect="show" validate={validateVenue}>
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
        />
        <ImageInput
          format={formatImage}
          source="image"
          label="Event image"
          accept="image/*"
          placeholder={<p>Drop your file here</p>}
        >
          <ImageField source="image" />
        </ImageInput>
        <TextInput
          source={`${translation}.imageAltText`}
          label={translate('events.fields.imageAltText.label')}
          validate={null}
        />

        <TextInput
          source={`${translation}.name`}
          label={translate('events.fields.name.label')}
          validate={selectedLanguage === Language.FI ? required() : null}
        />
        <TextInput
          source={`${translation}.shortDescription`}
          label={translate('events.fields.shortDescription.label')}
          validate={validateShortDescription}
          multiline
        />
        <TextInput
          source={`${translation}.description`}
          label={translate('events.fields.description.label')}
          multiline
        />
        <SelectInput
          source="participantsPerInvite"
          label={translate('events.fields.participantsPerInvite.label')}
          choices={participantsPerInviteChoices}
          validate={validateParticipantsPerInvite}
        />
        <NumberInput
          source="capacityPerOccurrence"
          label={translate('events.fields.capacityPerOccurrence.label')}
          validate={validateCapacityPerOccurrence}
        />
        <NumberInput
          source="duration"
          label={translate('events.fields.duration.label')}
          validate={validateDuration}
        />
      </SimpleForm>
    </Edit>
  );
};

export default EventEdit;
