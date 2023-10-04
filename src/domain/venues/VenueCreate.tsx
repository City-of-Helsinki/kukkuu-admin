import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import Aside from '../../common/components/aside/Aside';

const VenueCreate = () => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item>
      <CardHeader title={translate('venues.create.title')} />
      <Create
        aside={<Aside content="venues.create.aside.content" />}
        redirect="show"
      >
        <SimpleForm>
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <TextInput
            variant="outlined"
            source={`${translation}.name`}
            label="venues.fields.name.label"
            helperText="venues.fields.name.helperText"
            validate={selectedLanguage === Language.FI ? required() : undefined}
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.address`}
            label="venues.fields.address.label"
            helperText="venues.fields.address.helperText"
            multiline
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.description`}
            label="venues.fields.description.label"
            multiline
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.accessibilityInfo`}
            label="venues.fields.accessibilityInfo.label"
            helperText="venues.fields.accessibilityInfo.helperText"
            multiline
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.arrivalInstructions`}
            label="venues.fields.arrivalInstructions.label"
            helperText="venues.fields.arrivalInstructions.helperText"
            multiline
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.additionalInfo`}
            label="venues.fields.additionalInfo.label"
            helperText="venues.fields.additionalInfo.helperText"
            multiline
            fullWidth
          />
          <TextInput
            variant="outlined"
            source={`${translation}.wcAndFacilities`}
            label="venues.fields.wcAndFacilities.label"
            multiline
            fullWidth
          />
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default VenueCreate;
