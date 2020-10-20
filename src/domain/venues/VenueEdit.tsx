import React, { useState } from 'react';
import {
  TextInput,
  SimpleForm,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  useTranslate,
} from 'react-admin';
import { CardHeader, Grid } from '@material-ui/core';

import { Language } from '../../api/generatedTypes/globalTypes';
import LanguageTabs from '../../common/components/languageTab/LanguageTabs';
import { validateVenue } from './validations';
import ViewTitle from '../../common/components/viewTitle/ViewTitle';
import KukkuuEdit from '../../common/components/kukkuuEdit/KukkuuEdit';

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
    <>
      <CardHeader title={translate('venues.edit.title')} />
      <Grid container direction="column" xs={6} item={true}>
        <KukkuuEdit {...props}>
          <SimpleForm
            variant="outlined"
            redirect="show"
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            validate={validateVenue}
            toolbar={<VenueEditToolbar />}
          >
            <ViewTitle source={`${translation}.name`} />
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
              multiline
              fullWidth
            />
          </SimpleForm>
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default VenueEdit;
