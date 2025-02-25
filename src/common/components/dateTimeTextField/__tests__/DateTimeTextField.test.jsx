import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRecordContext, useTranslate, useInput } from 'react-admin';
import moment from 'moment-timezone';

import DateTimeTextInput, {
  validateDate,
  validateTime,
} from '../DateTimeTextField';

vi.mock('react-admin', () => ({
  useRecordContext: vi.fn(),
  useTranslate: vi.fn(),
  useInput: vi.fn(),
}));

describe('DateTimeTextInput component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const value = '2025-02-25T10:00:00Z';
    useRecordContext.mockReturnValue({ time: value });
    useTranslate.mockReturnValue((key) => key);
    useInput.mockReturnValue({
      field: { value },
      fieldState: { invalid: false },
      formState: { isSubmitted: false },
    });

    render(<DateTimeTextInput variant="outlined" required disabled={false} />);
    expect(
      screen.getByLabelText(/occurrences.fields.time.fields.date.label/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/occurrences.fields.time.fields.time.label/i)
    ).toBeInTheDocument();
  });

  it('displays the correct default date and time', () => {
    const value = '2025-02-25T10:00:00Z';
    useRecordContext.mockReturnValue({ time: value });
    useTranslate.mockReturnValue((key) => key);
    useInput.mockReturnValue({
      field: { value },
      fieldState: { invalid: false },
      formState: { isSubmitted: false },
    });

    render(<DateTimeTextInput variant="outlined" required disabled={false} />);
    expect(
      screen.getByDisplayValue(
        moment('2025-02-25T10:00:00Z').format('D.M.YYYY')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(moment('2025-02-25T10:00:00Z').format('HH:mm'))
    ).toBeInTheDocument();
  });

  it('applies validation correctly', () => {
    const value = '2025-02-25T10:00:00Z';
    useRecordContext.mockReturnValue({ time: value });
    useTranslate.mockReturnValue((key) => key);
    useInput.mockReturnValue({
      field: { value },
      fieldState: { invalid: false },
      formState: { isSubmitted: false },
    });

    render(<DateTimeTextInput variant="outlined" required disabled={false} />);
    const dateInput = screen.getByLabelText(
      /occurrences.fields.time.fields.date.label/i
    );
    const timeInput = screen.getByLabelText(
      /occurrences.fields.time.fields.time.label/i
    );

    expect(dateInput).toHaveAttribute('required');
    expect(timeInput).toHaveAttribute('required');
  });

  describe('validators', () => {
    it('should display error message for invalid date', () => {
      const invalidDate = '32.13.2021';
      const errorMessage = validateDate(invalidDate);
      expect(errorMessage).toBe(
        'occurrences.fields.time.fields.date.errorMessage'
      );
    });

    it('should not display error message for valid date', () => {
      const validDate = '12.12.2021';
      const errorMessage = validateDate(validDate);
      expect(errorMessage).toBeUndefined();
    });

    it('should display error message for invalid time', () => {
      const invalidTime = '25:61';
      const errorMessage = validateTime(invalidTime);
      expect(errorMessage).toBe(
        'occurrences.fields.time.fields.time.errorMessage'
      );
    });

    it('should not display error message for valid time', () => {
      const validTime = '23:59';
      const errorMessage = validateTime(validTime);
      expect(errorMessage).toBeUndefined();
    });
  });
});
