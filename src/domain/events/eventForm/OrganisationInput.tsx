import { useEffect } from 'react';
import {
  AutocompleteInput,
  ReferenceInput,
  required,
  useGetList,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';

import type { OrganisationNode } from '../../api/generatedTypes/graphql';

/**
 * An input component for selecting an event's organisation.
 *
 * If the user has access to only one organisation, it is automatically
 * preselected and the input is marked read-only.
 * When multiple organisations exist, the input is left unselected and enabled
 * for manual selection. In all cases, the selection is not clearable.
 */
const OrganisationInput = () => {
  const { data: organisations, isLoading } =
    useGetList<OrganisationNode>('organisations');
  const { setValue, watch } = useFormContext();
  const currentOrganisationId = watch('organisationId');

  const isSingle = !isLoading && organisations?.length === 1;

  useEffect(() => {
    if (isSingle && organisations?.[0]?.id) {
      if (currentOrganisationId !== organisations[0].id) {
        setValue('organisationId', organisations[0].id, {
          shouldValidate: true,
        });
      }
    }
  }, [isSingle, organisations, currentOrganisationId, setValue]);

  return (
    <ReferenceInput
      source="organisationId"
      reference="organisations"
      label="events.fields.organisation.label"
      isRequired
    >
      <AutocompleteInput
        optionText="name"
        label="events.fields.organisation.label"
        fullWidth
        readOnly={isSingle}
        disableClearable
        validate={required()}
      />
    </ReferenceInput>
  );
};

export default OrganisationInput;
