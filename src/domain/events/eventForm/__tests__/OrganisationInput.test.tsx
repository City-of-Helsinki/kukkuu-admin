import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AdminContext, Form, testDataProvider } from 'react-admin';
import { describe, it, expect, vi } from 'vitest';

import OrganisationInput from '../OrganisationInput';

type Organisation = { id: string; name: string };

const org1: Organisation = { id: 'org-1', name: 'Organisation 1' };
const org2: Organisation = { id: 'org-2', name: 'Organisation 2' };

const mockOrganisations = (organisations: Organisation[]) =>
  testDataProvider({
    getList: vi.fn().mockResolvedValue({
      data: organisations,
      total: organisations.length,
    }),
    getMany: vi.fn().mockResolvedValue({ data: organisations }),
  });

// Unlike a plain FormProvider, react-admin's Form resets itself on mount
const renderInput = ({
  organisations,
  defaultValues,
  queryClient,
  onSubmit = vi.fn(),
}: {
  organisations: Organisation[];
  defaultValues?: Record<string, unknown>;
  queryClient?: QueryClient;
  onSubmit?: (data: Record<string, unknown>) => void;
}) =>
  render(
    <AdminContext
      dataProvider={mockOrganisations(organisations)}
      queryClient={queryClient}
    >
      <Form defaultValues={defaultValues} onSubmit={onSubmit}>
        <OrganisationInput />
        <button type="submit">Save</button>
      </Form>
    </AdminContext>
  );

const save = () =>
  userEvent.click(screen.getByRole('button', { name: 'Save' }));

describe('OrganisationInput', () => {
  it('preselects and makes the input read-only when there is only 1 organisation', async () => {
    const onSubmit = vi.fn();

    renderInput({ organisations: [org1], onSubmit });

    await waitFor(() => {
      const input = screen.getByRole('combobox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('Mui-readOnly');
      expect(input).toHaveValue('Organisation 1');
    });

    // Verify submitted form data retains organisationId (readOnly vs disabled)
    await save();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ organisationId: 'org-1' }),
        expect.anything()
      );
    });

    // Verify clear button is not rendered
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });

  it('keeps the preselected organisation when the form resets with cached organisations', async () => {
    const onSubmit = vi.fn();
    const queryClient = new QueryClient();

    renderInput({ organisations: [org1], queryClient, onSubmit });
    await screen.findByDisplayValue('Organisation 1');
    cleanup();
    // The second form starts with the organisations already cached
    renderInput({ organisations: [org1], queryClient, onSubmit });
    expect(screen.getByRole('combobox')).toHaveClass('Mui-readOnly');
    await save();

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ organisationId: 'org-1' }),
        expect.anything()
      );
    });
  });

  it('does not preselect and leaves input enabled when there are multiple organisations', async () => {
    renderInput({ organisations: [org1, org2] });

    // Opening the list shows the organisations have loaded
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await screen.findByRole('option', { name: 'Organisation 1' });

    expect(input).not.toBeDisabled();
    expect(input).toHaveValue('');

    // Clear button should not be present
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });

  it('preserves existing selection and is not clearable when multiple organisations exist', async () => {
    renderInput({
      organisations: [org1, org2],
      defaultValues: { organisationId: 'org-2' },
    });

    await waitFor(() => {
      const input = screen.getByRole('combobox');
      expect(input).toBeInTheDocument();
      expect(input).not.toBeDisabled();
      expect(input).toHaveValue('Organisation 2');
    });

    // Clear button is not present even with an active value
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });
});
