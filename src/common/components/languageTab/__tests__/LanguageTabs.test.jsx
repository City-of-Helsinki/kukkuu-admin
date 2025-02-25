import * as React from 'react';
import { vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { useTranslate } from 'react-admin';

import LanguageTabs from '../LanguageTabs';
import useTranslatableContext from '../../../hooks/useTranslatableContext';

vi.mock('react-admin', () => ({
  useTranslate: vi.fn(),
}));

vi.mock('../../../hooks/useTranslatableContext', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('LanguageTabs', () => {
  const mockTranslate = vi.fn();
  const mockSelectLanguage = vi.fn();
  const mockLanguages = ['en', 'fi', 'sv'];
  const mockSelectedLanguage = 'en';

  beforeEach(() => {
    useTranslate.mockReturnValue(mockTranslate);
    useTranslatableContext.mockReturnValue({
      languages: mockLanguages,
      selectLanguage: mockSelectLanguage,
      selectedLanguage: mockSelectedLanguage,
    });
    mockTranslate.mockImplementation((key) => key);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    const { container } = render(<LanguageTabs />);
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of tabs', () => {
    render(<LanguageTabs />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(mockLanguages.length);
  });

  it('calls selectLanguage when a tab is clicked', () => {
    render(<LanguageTabs />);
    const tab = screen.getByText('languages.fi');
    fireEvent.click(tab);
    expect(mockSelectLanguage).toHaveBeenCalledWith('fi');
  });
});
