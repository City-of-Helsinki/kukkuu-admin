import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AdminContext,
  RecordContextProvider,
  testDataProvider,
} from 'react-admin';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import ThemePathInput from '../ThemePathInput';
import type { AdminEvent } from '../../types/EventTypes';
import i18nProvider from '../../../../common/translation/i18nProvider';

const rhythm = { id: 'path-1', slug: 'rhythm', name: 'Rhythm' };
const story = { id: 'path-2', slug: 'story', name: 'Story' };
const themePaths = [rhythm, story];

const dataProvider = testDataProvider({
  getList: vi.fn().mockResolvedValue({ data: themePaths, total: 2 }),
  getMany: vi.fn().mockResolvedValue({ data: themePaths }),
});

const Wrapper = ({
  record,
  onSubmit,
  children,
}: {
  record?: Partial<AdminEvent>;
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

describe('ThemePathInput', () => {
  it('requires a theme path when creating', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <ThemePathInput isEditing={false} />
      </Wrapper>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    ).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits the selected theme paths', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <ThemePathInput isEditing={false} />
      </Wrapper>
    );
    await userEvent.click(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    );
    await userEvent.click(await screen.findByRole('option', { name: 'Story' }));
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ themePathIds: ['path-2'] }),
        expect.anything()
      );
    });
  });

  it.each([true, false])(
    'preselects the theme paths of the record (isEditing: %s)',
    async (isEditing) => {
      const onSubmit = vi.fn();

      render(
        <Wrapper record={{ themePaths }} onSubmit={onSubmit}>
          <ThemePathInput isEditing={isEditing} />
        </Wrapper>
      );
      expect(await screen.findByText('Rhythm')).toBeInTheDocument();
      expect(await screen.findByText('Story')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ themePathIds: ['path-1', 'path-2'] }),
          expect.anything()
        );
      });
    }
  );

  it('is optional when editing an event without theme paths', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ themePaths: [] }} onSubmit={onSubmit}>
        <ThemePathInput isEditing />
      </Wrapper>
    );
    await screen.findByRole('combobox', { name: /^Teemapolut/ });
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('stays required when editing an event with theme paths', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ themePaths: [rhythm] }} onSubmit={onSubmit}>
        <ThemePathInput isEditing />
      </Wrapper>
    );
    await userEvent.click(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    );
    await userEvent.click(
      await screen.findByRole('option', { name: 'Rhythm' })
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    ).toBeInvalid();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
