import React from 'react';
import {
  TextInput,
  SimpleForm,
  SelectInput,
  NumberInput,
  required,
  FormDataConsumer,
  DateTimeInput,
} from 'react-admin';

import {
  Language,
  TicketSystem,
} from '../../../api/generatedTypes/globalTypes';
import ImageUploadField from '../../../common/components/imageField/ImageUploadField';
import useLanguageTabs from '../../../common/hooks/useLanguageTabs';
import {
  validateCapacityPerOccurrence,
  validateDuration,
  validateEvent,
  validateParticipantsPerInvite,
  validateShortDescription,
  validateUrl,
} from '../validations';
import { participantsPerInviteChoices, ticketSystemChoices } from '../choices';
import { RecordWithTicketSystem, hasInternalTicketSystem } from '../utils';
import Config from '../../config';
import TicketSystemInput from '../ticketSystemInput/TicketSystemInput';
import EventEditToolbar from '../edit/EventEditToolbar';

const EventForm = ({ view }: { view: 'create' | 'edit' }) => {
  const isEditing = view === 'edit';
  const [languageTabsComponent, translatableField, selectedLanguage] =
    useLanguageTabs();
  return (
    <SimpleForm
      // TODO: refactor form validate with YUP
      // https://marmelab.com/react-admin/Upgrade.html#input-level-validation-now-triggers-on-submit
      validate={validateEvent}
      toolbar={isEditing ? <EventEditToolbar /> : undefined}
    >
      {languageTabsComponent}
      <ImageUploadField
        edit={isEditing}
        source="image"
        image="image"
        helperText="events.fields.image.helperText"
      />
      <TextInput
        variant="outlined"
        source={translatableField('imageAltText')}
        label="events.fields.imageAltText.label"
        helperText="events.fields.imageAltText.helperText"
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('name')}
        label="events.fields.name.label"
        validate={selectedLanguage === Language.FI ? required() : undefined}
        // FIXME: missing translations
        helperText={isEditing ? 'Tähän laitetaan tapahtuman nimi' : undefined}
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('shortDescription')}
        label="events.fields.shortDescription.label"
        helperText="events.fields.shortDescription.helperText"
        validate={validateShortDescription}
        multiline
        fullWidth
      />
      <TextInput
        variant="outlined"
        source={translatableField('description')}
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
          defaultValue={!isEditing ? TicketSystem.INTERNAL : undefined}
          disabled={isEditing}
          fullWidth
        />
      )}
      <FormDataConsumer>
        {({ formData, getSource, ...rest }) =>
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
  );
};

export default EventForm;
