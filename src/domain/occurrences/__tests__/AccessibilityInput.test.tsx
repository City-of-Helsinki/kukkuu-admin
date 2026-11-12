import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AdminContext,
  RecordContextProvider,
  testDataProvider,
} from 'react-admin';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import AccessibilityInput from '../AccessibilityInput';
import type { AccessibilityNode } from '../../api/generatedTypes/graphql';
import i18nProvider from '../../../common/translation/i18nProvider';

const vision = { id: 'acc-1', slug: 'vision', name: 'Näkemisen tuki' };
const hearing = { id: 'acc-2', slug: 'hearing', name: 'Kuulemisen tuki' };
const accessibilities = [vision, hearing];

const dataProvider = testDataProvider({
  getList: vi.fn().mockResolvedValue({ data: accessibilities, total: 2 }),
  getMany: vi.fn().mockResolvedValue({ data: accessibilities }),
});

const Wrapper = ({
  record,
  onSubmit,
  children,
}: {
  record?: {
    accessibilities: Pick<AccessibilityNode, 'id' | 'slug' | 'name'>[];
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

const findAccessibilitiesSelect = () =>
  screen.findByRole('combobox', { name: /^Saavutettavuus/ });

describe('AccessibilityInput', () => {
  it('can be left empty', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <AccessibilityInput />
      </Wrapper>
    );
    await findAccessibilitiesSelect();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  it('submits the selected accessibilities', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper onSubmit={onSubmit}>
        <AccessibilityInput />
      </Wrapper>
    );
    await userEvent.click(await findAccessibilitiesSelect());
    await userEvent.click(
      await screen.findByRole('option', { name: 'Kuulemisen tuki' })
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accessibilityIds: ['acc-2'] }),
        expect.anything()
      );
    });
  });

  it('preselects the accessibilities of the record', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ accessibilities }} onSubmit={onSubmit}>
        <AccessibilityInput />
      </Wrapper>
    );
    const select = await findAccessibilitiesSelect();
    expect(
      await within(select).findByText('Näkemisen tuki')
    ).toBeInTheDocument();
    expect(
      await within(select).findByText('Kuulemisen tuki')
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accessibilityIds: ['acc-1', 'acc-2'] }),
        expect.anything()
      );
    });
  });

  it('submits an empty list when all selected accessibilities are removed', async () => {
    const onSubmit = vi.fn();

    render(
      <Wrapper record={{ accessibilities: [vision] }} onSubmit={onSubmit}>
        <AccessibilityInput />
      </Wrapper>
    );
    await userEvent.click(await findAccessibilitiesSelect());
    await userEvent.click(
      await screen.findByRole('option', { name: 'Näkemisen tuki' })
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ accessibilityIds: [] }),
        expect.anything()
      );
    });
  });
});
