import React, { useState } from 'react';
import {
  Edit,
  TextInput,
  SimpleForm,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
} from 'react-admin';
import { Grid } from '@material-ui/core';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';

const VenueEditTitle = ({ record }: any) => {
  return (
    // TODO make translatable
    <span>{`Muokkaa tapahtumapaikkaa ${record.translations.FI.name}`}</span>
  );
};

const VenueEditToolbar = (props: any) => {
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...props}>
      <SaveButton />
      <DeleteButton
        disabled={Boolean(props.record.occurrences.pageInfo.startCursor)}
      />
    </Toolbar>
  );
};

const VenueEdit = (props: any) => {
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  return (
    <Grid container direction="column" xs={6} item={true}>
      <Edit title={<VenueEditTitle />} {...props}>
        <SimpleForm
          variant="outlined"
          redirect="show"
          validate={validateVenue}
          toolbar={<VenueEditToolbar />}
        >
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
          <TextInput
            source={`${translation}.wcAndFacilities`}
            label="venues.fields.wcAndFacilities.label"
            helperText="venues.fields.wcAndFacilities.helperText"
            multiline
            fullWidth
          />
        </SimpleForm>
      </Edit>
    </Grid>
  );
};

export default VenueEdit;
