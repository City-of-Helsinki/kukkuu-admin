import React, { useState } from 'react';
import {
  Edit,
  TextInput,
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

const EventEdit = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Edit title={translate('events.edit.title')} {...props}>
      <SimpleForm redirect="show" validate={validateVenue}>
        <LanguageTabs
          selectedLanguage={selectedLanguage}
          onSelect={selectLanguage}
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
          choices={[
            {
              id: 'CHILD_AND_GUARDIAN',
              name: translate(
                'events.fields.participantsPerInvite.choices.CHILD_AND_GUARDIAN.label'
              ),
            },
            {
              id: 'FAMILY',
              name: translate(
                'events.fields.participantsPerInvite.choices.FAMILY.label'
              ),
            },
          ]}
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
