import React from 'react';
import { render } from '@testing-library/react';
import { AdminContext, ResourceContextProvider, SimpleForm } from 'react-admin';

import { OccurrenceCapacityOverrideInput } from '../inputs';

describe('inputs', () => {
  describe('<OccurrenceCapacityOverrideInput />', () => {
    const defaultProps = {
      record: {
        event: {
          capacityPerOccurrence: 2,
        },
      },
      id: 'test-1',
    };
    const getWrapper = () =>
      render(
        <AdminContext>
          <ResourceContextProvider value="occurrences">
            <SimpleForm>
              <OccurrenceCapacityOverrideInput {...defaultProps} />
            </SimpleForm>
          </ResourceContextProvider>
        </AdminContext>
      );

    it('should render input', () => {
      const { getByLabelText } = getWrapper();

      expect(
        getByLabelText('occurrences.fields.capacityOverride.label')
      ).toBeInTheDocument();
    });

    it('should render description', () => {
      const { getByText } = getWrapper();

      expect(
        getByText('occurrences.fields.capacityOverride.helperText')
      ).toBeInTheDocument();
    });
  });
});
