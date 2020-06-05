import React, { useState } from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { Grid } from '@material-ui/core';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';

const VenueCreate = (props: any) => {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item={true}>
      <Create title="venues.create.title" {...props}>
        <SimpleForm variant="outlined" redirect="show" validate={validateVenue}>
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <TextInput
            source={`${translation}.name`}
            label="venues.fields.name.label"
            helperText="venues.fields.name.helperText"
            validate={selectedLanguage === Language.FI ? required() : null}
            fullWidth
          />
          <TextInput
            source={`${translation}.address`}
            label="venues.fields.address.label"
            helperText="venues.fields.address.helperText"
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.description`}
            label="venues.fields.description.label"
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.accessibilityInfo`}
            label="venues.fields.accessibilityInfo.label"
            helperText="venues.fields.accessibilityInfo.helperText"
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.arrivalInstructions`}
            label="venues.fields.arrivalInstructions.label"
            helperText="venues.fields.arrivalInstructions.helperText"
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.additionalInfo`}
            label="venues.fields.additionalInfo.label"
            helperText="venues.fields.additionalInfo.helperText"
            multiline
            fullWidth
          />
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default VenueCreate;
