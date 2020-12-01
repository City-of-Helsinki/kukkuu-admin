import React from 'react';
import { render } from '@testing-library/react';
import { TestContext, SimpleForm } from 'react-admin';

import i18nProvider from '../../../common/translation/i18nProvider';
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
        <TestContext i18nProvider={i18nProvider}>
          <SimpleForm>
            <OccurrenceCapacityOverrideInput {...defaultProps} />
          </SimpleForm>
        </TestContext>
      );

    it('should render input', () => {
      const { getByLabelText } = getWrapper();

      expect(
        getByLabelText('occurrences.fields.capacityOverride.label')
      ).toBeTruthy();
    });

    it('should render description', () => {
      const { getByText } = getWrapper();

      expect(
        getByText('occurrences.fields.capacityOverride.helperText')
      ).toBeTruthy();
    });
  });
});
