import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRecordContext, RecordContextProvider } from 'react-admin';

import ViewTitle from '../ViewTitle';

// Mock the react-admin hooks and components
vi.mock('react-admin', () => ({
  useRecordContext: vi.fn(),
  // eslint-disable-next-line react/prop-types
  RecordContextProvider: ({ children }) => <div>{children}</div>,
}));

describe('ViewTitle', () => {
  it('renders the title from the record context when translations.FI.name exists', () => {
    const mockRecord = {
      translations: {
        FI: {
          name: 'Test Name',
        },
      },
    };
    useRecordContext.mockReturnValue(mockRecord);

    render(<ViewTitle />);

    expect(screen.getByText('Test Name')).toBeInTheDocument();
  });

  it('renders an empty title when translations.FI.name does not exist', () => {
    const mockRecord = {
      translations: {
        FI: {}, // Missing name
      },
    };
    useRecordContext.mockReturnValue(mockRecord);

    const { container } = render(<ViewTitle />);

    expect(container).toMatchSnapshot();
  });

  it('renders an empty title when record context is empty', () => {
    const mockRecord = {};
    useRecordContext.mockReturnValue(mockRecord);
    const { container } = render(<ViewTitle />);

    expect(container).toMatchSnapshot();
  });
});
