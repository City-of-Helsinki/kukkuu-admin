import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AdminContext,
  RecordContextProvider,
  testDataProvider,
} from 'react-admin';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import OccurrenceLanguageInput from '../OccurrenceLanguageInput';
import type { LanguageNode } from '../../api/generatedTypes/graphql';
import i18nProvider from '../../../common/translation/i18nProvider';

const finnish = { id: 'lang-1', alpha3Code: 'fin', name: 'suomi' };
const english = { id: 'lang-2', alpha3Code: 'eng', name: 'englanti' };
const languages = [finnish, english];

const getList = vi.fn();

const dataProvider = testDataProvider({
  getList,
  getMany: vi.fn().mockResolvedValue({ data: languages }),
});

const Wrapper = ({
  record,
  onSubmit,
  children,
}: {
  record?: {
    languages: Pick<LanguageNode, 'id' | 'alpha3Code' | 'name'>[];
  };
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}) => {
  const methods = useForm();

  return (
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>
        <FormProvider {...methods}>
          <form data-testid="form" onSubmit={methods.handleSubmit(onSubmit)}>
            {children}
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      </RecordContextProvider>
    </AdminContext>
  );
};

const findLanguagesSelect = () =>
  screen.findByRole('combobox', { name: /^Kielet/ });

describe('OccurrenceLanguageInput', () => {
  beforeEach(() => {
    getList.mockReset().mockResolvedValue({ data: languages, total: 2 });
  });

  it('only offers the languages an occurrence can be held in', async () => {
    render(
      <Wrapper onSubmit={vi.fn()}>
        <OccurrenceLanguageInput />
      </Wrapper>
    );
    await findLanguagesSelect();

    await waitFor(() =>
      expect(getList).toHaveBeenCalledWith(
        'languages',
        expect.objectContaining({
          filter: { canBeOccurrenceLanguage: true },
        })
      )
    );
  });

  it('can not be submitted without a language', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <OccurrenceLanguageInput />
      </Wrapper>
    );
    const select = await findLanguagesSelect();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(select).toBeInvalid());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('can not be submitted when all languages of the record are removed', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ languages: [finnish] }} onSubmit={onSubmit}>
        <OccurrenceLanguageInput />
      </Wrapper>
    );
    const select = await findLanguagesSelect();
    await userEvent.click(select);
    await userEvent.click(await screen.findByRole('option', { name: 'suomi' }));
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(select).toBeInvalid());
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the selected languages', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <OccurrenceLanguageInput />
      </Wrapper>
    );
    await userEvent.click(await findLanguagesSelect());
    await userEvent.click(
      await screen.findByRole('option', { name: 'englanti' })
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ languageIds: ['lang-2'] }),
        expect.anything()
      );
    });
  });

  it('preselects the languages of the record', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ languages }} onSubmit={onSubmit}>
        <OccurrenceLanguageInput />
      </Wrapper>
    );
    const select = await findLanguagesSelect();
    expect(await within(select).findByText('suomi')).toBeInTheDocument();
    expect(await within(select).findByText('englanti')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ languageIds: ['lang-1', 'lang-2'] }),
        expect.anything()
      );
    });
  });
});
