import { fireEvent, render, waitFor } from '@testing-library/react';
import { AdminContext, ResourceContextProvider, SimpleForm } from 'react-admin';
import { vi } from 'vitest';

import {
  OccurrenceAttendedCountOverrideInput,
  OccurrenceCapacityOverrideInput,
} from '../inputs';

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

  describe('<OccurrenceAttendedCountOverrideInput />', () => {
    const getWrapper = (onSubmit = vi.fn(), record = undefined) =>
      render(
        <AdminContext>
          <ResourceContextProvider value="occurrences">
            <SimpleForm onSubmit={onSubmit} record={record}>
              <OccurrenceAttendedCountOverrideInput />
            </SimpleForm>
          </ResourceContextProvider>
        </AdminContext>
      );

    it('should render both override inputs with step=1, warning, and helper text', () => {
      const { getByLabelText, getAllByText, getByText } = getWrapper();

      const childrenInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.childrenLabel'
      );
      const adultsInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.adultsLabel'
      );
      expect(childrenInput).toBeInTheDocument();
      expect(childrenInput).toHaveAttribute('step', '1');
      expect(adultsInput).toBeInTheDocument();
      expect(adultsInput).toHaveAttribute('step', '1');
      expect(
        getAllByText('occurrences.fields.attendedCountOverride.helperText')
      ).toHaveLength(2);
      expect(
        getByText('occurrences.fields.attendedCountOverride.formWarning')
      ).toBeInTheDocument();
    });

    it('rejects fractional values before submission', async () => {
      const onSubmit = vi.fn();
      const { getByLabelText, getByText } = getWrapper(onSubmit);

      const childrenInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.childrenLabel'
      );
      const adultsInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.adultsLabel'
      );
      fireEvent.change(childrenInput, { target: { value: '1.5' } });
      fireEvent.change(adultsInput, { target: { value: '2' } });
      fireEvent.click(getByText('ra.action.save'));

      await waitFor(() => {
        expect(getByText('ra.validation.number')).toBeInTheDocument();
      });
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('rejects filling only one of the two override fields', async () => {
      const onSubmit = vi.fn();
      const { getByLabelText, getByText } = getWrapper(onSubmit);

      const childrenInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.childrenLabel'
      );
      fireEvent.change(childrenInput, { target: { value: '3' } });
      fireEvent.click(getByText('ra.action.save'));

      await waitFor(() => {
        expect(
          getByText('occurrences.fields.attendedCountOverride.bothRequired')
        ).toBeInTheDocument();
      });
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('accepts 0 as a valid explicit value for both fields', async () => {
      const onSubmit = vi.fn();
      const { getByLabelText, getByText } = getWrapper(onSubmit, {
        attendedChildrenCountOverride: 5,
        attendedAdultsCountOverride: 4,
      });

      const childrenInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.childrenLabel'
      );
      const adultsInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.adultsLabel'
      );

      fireEvent.change(childrenInput, { target: { value: '0' } });
      fireEvent.change(adultsInput, { target: { value: '0' } });
      fireEvent.click(getByText('ra.action.save'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            attendedChildrenCountOverride: 0,
            attendedAdultsCountOverride: 0,
          }),
          expect.anything()
        );
      });
    });

    it('accepts null (cleared) when both fields are cleared', async () => {
      const onSubmit = vi.fn();
      const { getByLabelText, getByText } = getWrapper(onSubmit, {
        attendedChildrenCountOverride: 5,
        attendedAdultsCountOverride: 4,
      });

      const childrenInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.childrenLabel'
      );
      const adultsInput = getByLabelText(
        'occurrences.fields.attendedCountOverride.adultsLabel'
      );

      fireEvent.change(childrenInput, { target: { value: '' } });
      fireEvent.change(adultsInput, { target: { value: '' } });
      fireEvent.click(getByText('ra.action.save'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            attendedChildrenCountOverride: null,
            attendedAdultsCountOverride: null,
          }),
          expect.anything()
        );
      });
    });
  });
});
