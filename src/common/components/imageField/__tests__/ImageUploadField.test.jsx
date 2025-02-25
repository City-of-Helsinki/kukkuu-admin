import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  useTranslate,
  useInput,
  useRecordContext,
  useController,
} from 'react-admin';

import ImageUploadField from '../ImageUploadField';

vi.mock('react-admin', async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRecordContext: vi.fn(),
    useTranslate: vi.fn(),
    useInput: vi.fn(),
    useController: vi.fn(),
    // Mock the ImageInput, because it is really hard to mock the controls of Fileinput.
    // We are more like testing whether the props are handled correctly.
    // eslint-disable-next-line react/prop-types
    ImageInput: ({ name, edit, image, source, helperText }) => (
      <div>
        ImageInput: <label htmlFor={source}>{name}</label>
        <input id={source} />
        <div>{helperText}</div>
      </div>
    ),
  };
});

describe('ImageUploadField', () => {
  const defaultProps = {
    name: 'testName',
    edit: false,
    image: 'testImage',
    source: 'testSource',
    helperText: 'testHelperText',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render ImageUploadField with default props', () => {
    const value = '';
    const fieldState = { invalid: false, isTouched: false, error: null };
    const formState = { isSubmitted: false };
    useRecordContext.mockReturnValue({ [defaultProps.name]: value });
    useTranslate.mockReturnValue((key) => key);
    useController.mockReturnValue({
      field: { value, controlled: false },
      fieldState,
      formState,
    });
    useInput.mockReturnValue({
      id: defaultProps.name,
      field: { value, controlled: false },
      fieldState,
      formState,
      isRequired: false,
    });

    render(<ImageUploadField {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.helperText)).toBeInTheDocument();
  });
});
