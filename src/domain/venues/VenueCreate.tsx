import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useTranslate,
} from 'react-admin';
import { CardHeader, Grid } from '@material-ui/core';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';
import Aside from '../../common/components/aside/Aside';

const VenueCreate = (props: any) => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item={true}>
      <CardHeader title={translate('venues.create.title')} />
      <Create
        aside={<Aside content="venues.create.aside.content" />}
        {...props}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */}
        {/* @ts-ignore */}
        <SimpleForm variant="outlined" redirect="show" validate={validateVenue}>
          <LanguageTabs
            selectedLanguage={selectedLanguage}
            onSelect={selectLanguage}
          />
          <TextInput
            source={`${translation}.name`}
            label="venues.fields.name.label"
            helperText="venues.fields.name.helperText"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
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
          <TextInput
            source={`${translation}.wcAndFacilities`}
            label="venues.fields.wcAndFacilities.label"
            helperText="venues.fields.wcAndFacilities.helperText"
            multiline
            fullWidth
          />
        </SimpleForm>
      </Create>
    </Grid>
  );
};

export default VenueCreate;
