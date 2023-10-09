import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import { Language } from '../../api/generatedTypes/globalTypes';
import Aside from '../../common/components/aside/Aside';
import useLanguageTabs from '../../common/hooks/useLanguageTabs';

const VenueCreate = () => {
  const translate = useTranslate();
  const [languageTabsComponent, translatableField, selectedLanguage] =
    useLanguageTabs();

  return (
    <Grid container direction="column" xs={6} item>
      <CardHeader title={translate('venues.create.title')} />
      <Create
        aside={<Aside content="venues.create.aside.content" />}
        redirect="show"
      >
        <SimpleForm>
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
      </Create>
    </Grid>
  );
};

export default VenueCreate;
