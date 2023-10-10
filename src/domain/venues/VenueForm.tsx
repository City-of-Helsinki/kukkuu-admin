import React from 'react';
import { TextInput, SimpleForm, required } from 'react-admin';

import { Language } from '../../api/generatedTypes/globalTypes';
import { validateVenue } from './validations';
import VenueEditToolbar from './VenueEditToolbar';
import useTranslatableContext from '../../common/hooks/useTranslatableContext';

const VenueForm = ({ view }: { view: 'create' | 'edit' }) => {
  const isEditing = view === 'edit';

  const {
    selector: languageTabsComponent,
    getSource: translatableField,
    selectedLanguage,
  } = useTranslatableContext();

  return (
    <SimpleForm
      // TODO: refactor form validate with YUP
      // https://marmelab.com/react-admin/Upgrade.html#input-level-validation-now-triggers-on-submit
      validate={validateVenue}
      toolbar={isEditing ? <VenueEditToolbar /> : undefined}
    >
      {languageTabsComponent}
      <TextInput
        variant="outlined"
        source={translatableField('name')}
        label="venues.fields.name.label"
        helperText="venues.fields.name.helperText"
        validate={selectedLanguage === Language.FI ? required() : undefined}
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('address')}
        label="venues.fields.address.label"
        helperText="venues.fields.address.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('description')}
        label="venues.fields.description.label"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('accessibilityInfo')}
        label="venues.fields.accessibilityInfo.label"
        helperText="venues.fields.accessibilityInfo.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('arrivalInstructions')}
        label="venues.fields.arrivalInstructions.label"
        helperText="venues.fields.arrivalInstructions.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('additionalInfo')}
        label="venues.fields.additionalInfo.label"
        helperText="venues.fields.additionalInfo.helperText"
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('wcAndFacilities')}
        label="venues.fields.wcAndFacilities.label"
        multiline
        fullWidth
      />
    </SimpleForm>
  );
};

export default VenueForm;
