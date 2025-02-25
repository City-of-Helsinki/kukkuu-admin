import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRecordContext, useLocaleState } from 'react-admin';
import get from 'lodash/get';

import PublishedField from '../PublishedField';
import { toDateTimeString } from '../../../utils';

// Mock the react-admin hooks and lodash/get
vi.mock('react-admin', () => ({
  useRecordContext: vi.fn(),
  useLocaleState: vi.fn(),
}));

vi.mock('lodash/get', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock utils
vi.mock('../../../utils', () => ({
  toDateTimeString: vi.fn(),
}));

describe('PublishedField', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useLocaleState.mockReturnValue(['en']); // Default locale
  });

  it('renders null when no record is present', () => {
    useRecordContext.mockReturnValue(undefined);

    const result = render(<PublishedField source="publishedAt" />);

    expect(result.container.firstChild).toBeNull();
  });

  it('renders emptyText when source data is not present', () => {
    const mockRecord = { id: 1 };
    const emptyText = 'Not published';
    useRecordContext.mockReturnValue(mockRecord);
    get.mockReturnValue(undefined);

    render(<PublishedField source="publishedAt" emptyText={emptyText} />);

    expect(screen.getByText(emptyText)).toBeInTheDocument();
  });

  it('renders formatted date when source data is present and no render prop', () => {
    const mockRecord = { id: 1, publishedAt: '2023-10-27T10:00:00.000Z' };
    const formattedDate = '27/10/2023 13:00';
    useRecordContext.mockReturnValue(mockRecord);
    get.mockImplementation((obj, path) => obj[path]);
    toDateTimeString.mockReturnValue(formattedDate);

    render(<PublishedField source="publishedAt" />);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(toDateTimeString).toHaveBeenCalledWith(
      new Date(mockRecord.publishedAt),
      'en'
    );
  });

  it('renders custom content when render prop is present', () => {
    const mockRecord = { id: 1, publishedAt: '2023-10-27T10:00:00.000Z' };
    const customContent = 'Custom Rendered Content';
    const renderFn = vi.fn(() => customContent);
    useRecordContext.mockReturnValue(mockRecord);
    get.mockImplementation((obj, path) => obj[path]);

    render(<PublishedField source="publishedAt" render={renderFn} />);

    expect(screen.getByText(customContent)).toBeInTheDocument();
    expect(renderFn).toHaveBeenCalledWith(new Date(mockRecord.publishedAt));
  });

  it('calls toDateTimeString with correct locale', () => {
    const mockRecord = { id: 1, publishedAt: '2023-10-27T10:00:00.000Z' };
    const formattedDate = '27/10/2023 13:00';
    const locale = 'fi';

    useRecordContext.mockReturnValue(mockRecord);
    get.mockImplementation((obj, path) => obj[path]);
    useLocaleState.mockReturnValue([locale]); // Use different locale

    render(<PublishedField source="publishedAt" />);

    expect(toDateTimeString).toHaveBeenCalledWith(
      new Date(mockRecord.publishedAt),
      locale
    );
  });
});
