import {
  AutocompleteInput,
  ReferenceInput,
  required,
  useGetList,
} from 'react-admin';

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
  const { data: organisations } = useGetList<OrganisationNode>('organisations');
  const singleOrganisationId =
    organisations?.length === 1 ? organisations[0].id : undefined;
  const hasSingleOrganisation = singleOrganisationId !== undefined;

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
        // react-admin applies this to an empty field with no record value
        defaultValue={singleOrganisationId}
        readOnly={hasSingleOrganisation}
        disableClearable
        validate={required()}
      />
    </ReferenceInput>
  );
};

export default OrganisationInput;
