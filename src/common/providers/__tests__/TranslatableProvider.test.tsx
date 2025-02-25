import React, { act } from 'react';
import type { RenderResult } from '@testing-library/react';
import { render, screen, waitFor } from '@testing-library/react';

import TranslatableProvider from '../TranslatableProvider';
import TranslatableContext from '../../contexts/TranslatableContext';
import { CONTENT_LANGUAGES } from '../../constants';
import { Language } from '../../../domain/api/generatedTypes/graphql';

describe('TranslatableProvider', () => {
  function renderWithContext(ui: React.ReactElement | null): {
    contextValue: any;
    result: RenderResult;
  } {
    let contextValue: any;
    const result = render(
      <TranslatableProvider>
        <TranslatableContext.Consumer>
          {(value) => {
            contextValue = value;
            return ui; // Render the provided UI inside the consumer
          }}
        </TranslatableContext.Consumer>
      </TranslatableProvider>
    );

    return { contextValue, result };
  }

  it('renders children within the provider', () => {
    render(
      <TranslatableProvider>
        <div data-testid="child-element">Child Element</div>
      </TranslatableProvider>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  it('provides the correct context values', () => {
    const { contextValue } = renderWithContext(null);

    expect(contextValue).toBeDefined();
    expect(contextValue.getSource).toBeInstanceOf(Function);
    expect(contextValue.defaultLanguage).toBe(Language.Fi);
    expect(contextValue.languages).toEqual(CONTENT_LANGUAGES);
    expect(contextValue.selectLanguage).toBeInstanceOf(Function);
    expect(contextValue.selectedLanguage).toBe(Language.Fi);
    expect(contextValue.selector).toBeDefined();
  });

  it('uses the correct default values when not specified', () => {
    const { contextValue } = renderWithContext(null);

    expect(contextValue.defaultLanguage).toBe(Language.Fi);
    expect(contextValue.languages).toEqual(CONTENT_LANGUAGES);
  });

  it('overrides default language, languages and selector when provided', () => {
    const customLanguages = [Language.En, Language.Sv];
    const customDefaultLanguage = Language.En;
    const customSelector = (
      <div data-testid="custom-selector">Custom Selector</div>
    );

    let contextValue: any;
    render(
      <TranslatableProvider
        defaultLanguage={customDefaultLanguage}
        languages={customLanguages}
        selector={customSelector}
      >
        <TranslatableContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </TranslatableContext.Consumer>
      </TranslatableProvider>
    );

    expect(contextValue.defaultLanguage).toBe(customDefaultLanguage);
    expect(contextValue.languages).toEqual(customLanguages);
  });

  it('getSource returns the correct translation key', () => {
    const { contextValue } = renderWithContext(null);

    expect(contextValue.getSource('testField')).toBe(
      'translations.FI.testField'
    );
  });
});
