import React, { useState } from 'react';
import {
  Edit,
  TextInput,
  useTranslate,
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
  const translate = useTranslate();
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
            label={translate('venues.fields.name.label')}
            validate={selectedLanguage === Language.FI ? required() : null}
            fullWidth
          />
          <TextInput
            source={`${translation}.address`}
            label={translate('venues.fields.address.label')}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.description`}
            label={translate('venues.fields.description.label')}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.accessibilityInfo`}
            label={translate('venues.fields.accessibilityInfo.label')}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.arrivalInstructions`}
            label={translate('venues.fields.arrivalInstructions.label')}
            multiline
            fullWidth
          />
          <TextInput
            source={`${translation}.additionalInfo`}
            label={translate('venues.fields.additionalInfo.label')}
            multiline
            fullWidth
          />
        </SimpleForm>
      </Edit>
    </Grid>
  );
};

export default VenueEdit;
