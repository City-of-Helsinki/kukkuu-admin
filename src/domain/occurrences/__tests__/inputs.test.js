import React from 'react';
import { render } from '@testing-library/react';
import { AdminContext, SimpleForm } from 'react-admin';

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
          <SimpleForm>
            <OccurrenceCapacityOverrideInput {...defaultProps} />
          </SimpleForm>
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
