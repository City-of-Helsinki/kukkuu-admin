import React, { useState } from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  useTranslate,
  FormDataConsumer,
  DateTimeInput,
  ToolbarProps,
  SelectInputProps,
  MutationMode,
  useRecordContext,
} from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import LanguageTabs from '../../../common/components/languageTab/LanguageTabs';
import { Language } from '../../../api/generatedTypes/globalTypes';
import { validateVenue } from '../../venues/validations';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateParticipantsPerInvite,
  validateShortDescription,
  validateUrl,
} from '../validations';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import ImageUploadField from '../../../common/components/imageField/ImageUploadField';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import KukkuuEdit from '../../application/layout/kukkuuEditPage/KukkuuEdit';
import { hasInternalTicketSystem, type RecordWithTicketSystem } from '../utils';
import Config from '../../config';

const EventEditToolbar = ({
  mutationMode,
  ...toolbarProps
}: ToolbarProps & { disabled?: boolean; mutationMode?: MutationMode }) => {
  const record = useRecordContext();
  return (
    <Toolbar style={{ justifyContent: 'space-between' }} {...toolbarProps}>
      <SaveButton />
      <DeleteButton disabled={Boolean(record.occurrences.edges.length)} />
    </Toolbar>
  );
};

const TicketSystemInput = (props: SelectInputProps) => {
  const record = useRecordContext();
  return <SelectInput disabled={!!record?.publishedAt} {...props} />;
};

const EventEdit = () => {
  const translate = useTranslate();
  const [selectedLanguage, selectLanguage] = useState(Language.FI);
  const translation = `translations.${selectedLanguage}`;

  // Undoable / mutationMode is false to prevent image from appearing while waiting for backend result.
  return (
    <>
      <CardHeader title={translate('events.edit.title')} />
      <Grid container direction="column" xs={6} item>
        <KukkuuEdit
          mutationMode={'pessimistic'}
          title={'events.edit.title'}
          redirect="show"
        >
          <SimpleForm
            // TODO: refactor form validate with YUP
            // https://marmelab.com/react-admin/Upgrade.html#input-level-validation-now-triggers-on-submit
            validate={validateVenue}
            toolbar={<EventEditToolbar />}
          >
            <ViewTitle source={'events.edit.title'} />
            <LanguageTabs
              selectedLanguage={selectedLanguage}
              onSelect={selectLanguage}
            />
            <ImageUploadField
              edit
              name="image"
              source="image"
              helperText="events.fields.image.helperText"
            />
            <TextInput
              variant="outlined"
              source={`${translation}.imageAltText`}
              label="events.fields.imageAltText.label"
              helperText="events.fields.imageAltText.helperText"
              fullWidth
            />
            <TextInput
              variant="outlined"
              source={`${translation}.name`}
              label="events.fields.name.label"
              validate={
                selectedLanguage === Language.FI ? required() : undefined
              }
              fullWidth
              helperText="Tähän laitetaan tapahtuman nimi"
            />
            <TextInput
              variant="outlined"
              source={`${translation}.shortDescription`}
              label="events.fields.shortDescription.label"
              helperText="events.fields.shortDescription.helperText"
              validate={validateShortDescription}
              multiline
              fullWidth
            />
            <TextInput
              variant="outlined"
              source={`${translation}.description`}
              label="events.fields.description.label"
              helperText="events.fields.description.helperText"
              multiline
              fullWidth
            />
            <SelectInput
              variant="outlined"
              source="participantsPerInvite"
              label="events.fields.participantsPerInvite.label"
              helperText="events.fields.participantsPerInvite.helperText"
              choices={participantsPerInviteChoices}
              validate={validateParticipantsPerInvite}
              fullWidth
            />
            {Config.featureFlagExternalTicketSystemSupport && (
              <TicketSystemInput
                variant="outlined"
                source="ticketSystem.type"
                label="events.fields.ticketSystem.label"
                choices={ticketSystemChoices}
                fullWidth
                disabled
              />
            )}
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                // TODO this part is exactly the same as in EventCreate so there could be a common component for both
                hasInternalTicketSystem(formData as RecordWithTicketSystem)
                  ? [
                      <NumberInput
                        variant="outlined"
                        source="duration"
                        key="duration"
                        label="events.fields.duration.label"
                        helperText="events.fields.duration.helperText"
                        validate={validateDuration}
                        style={{ width: '100%' }}
                        {...rest}
                      />,
                      <NumberInput
                        variant="outlined"
                        source="capacityPerOccurrence"
                        key="capacityPerOccurrence"
                        label="events.fields.capacityPerOccurrence.label"
                        helperText="events.fields.capacityPerOccurrence.helperText"
                        validate={validateCapacityPerOccurrence}
                        style={{ width: '100%' }}
                        {...rest}
                        // aria-describedby should be set automatically but it is not.
                        // Seems like a bug related to FormDataConsumer.
                        aria-describedby="capacityPerOccurrence-helper-text"
                        id="capacityPerOccurrence"
                      />,
                    ]
                  : [
                      <TextInput
                        variant="outlined"
                        source="ticketSystem.url"
                        key="ticketSystemUrl"
                        label="events.fields.ticketSystemUrl.label"
                        validate={validateUrl}
                        style={{ width: '100%' }}
                        {...rest}
                      />,
                      <DateTimeInput
                        variant="outlined"
                        source="ticketSystem.endTime"
                        key="ticketSystemEndTime"
                        label="events.fields.ticketSystemEndTime.label"
                        helperText="events.fields.ticketSystemEndTime.helperText"
                        style={{ width: '100%' }}
                        {...rest}
                        aria-describedby="ticketSystemEndTime-helper-text"
                        id="ticketSystemEndTime"
                      />,
                    ]
              }
            </FormDataConsumer>
          </SimpleForm>
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
