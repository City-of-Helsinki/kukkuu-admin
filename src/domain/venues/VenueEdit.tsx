import React from 'react';
import {
  TextInput,
  SimpleForm,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  useTranslate,
  useRecordContext,
} from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import { Language } from '../../api/generatedTypes/globalTypes';
import ViewTitle from '../../common/components/viewTitle/ViewTitle';
import KukkuuEdit from '../application/layout/kukkuuEditPage/KukkuuEdit';
import { validateVenue } from './validations';
import { Venue_venue } from '../../api/generatedTypes/Venue';
import useLanguageTabs from '../../common/hooks/useLanguageTabs';

const VenueEditToolbar = () => {
  const record = useRecordContext<Venue_venue>();
  return (
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <SaveButton />
      <DeleteButton
        disabled={Boolean(record.occurrences?.pageInfo?.startCursor)}
      />
    </Toolbar>
  );
};

const VenueEdit = () => {
  const translate = useTranslate();
  const [languageTabsComponent, translatableField, selectedLanguage] =
    useLanguageTabs();

  return (
    <>
      <CardHeader title={translate('venues.edit.title')} />
      <Grid container direction="column" xs={6} item>
        <KukkuuEdit redirect="show">
          <SimpleForm
            // TODO: refactor form validate with YUP
            // https://marmelab.com/react-admin/Upgrade.html#input-level-validation-now-triggers-on-submit
            validate={validateVenue}
            toolbar={<VenueEditToolbar />}
          >
            <ViewTitle />
            {languageTabsComponent}
            <TextInput
              variant="outlined"
              source={translatableField('name')}
              label="venues.fields.name.label"
              helperText="venues.fields.name.helperText"
              validate={
                selectedLanguage === Language.FI ? required() : undefined
              }
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
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default VenueEdit;
