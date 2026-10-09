import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AdminContext, testDataProvider } from 'react-admin';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect, vi } from 'vitest';

import OrganisationInput from '../OrganisationInput';

const Wrapper = ({
  dataProvider,
  defaultValues = {},
  onSubmit,
  children,
}: {
  dataProvider: any;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: any) => void;
  children: React.ReactNode;
}) => {
  const methods = useForm({
    defaultValues,
  });

  return (
    <AdminContext dataProvider={dataProvider}>
      <FormProvider {...methods}>
        <form
          data-testid="form"
          onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        >
          {children}
        </form>
      </FormProvider>
    </AdminContext>
  );
};

describe('OrganisationInput', () => {
  it('preselects and makes the input read-only when there is only 1 organisation', async () => {
    const onSubmit = vi.fn();
    const dataProvider = testDataProvider({
      getList: vi.fn().mockResolvedValue({
        data: [{ id: 'org-1', name: 'Single Organisation' }],
        total: 1,
      }),
      getMany: vi.fn().mockResolvedValue({
        data: [{ id: 'org-1', name: 'Single Organisation' }],
      }),
    });

    render(
      <Wrapper dataProvider={dataProvider} onSubmit={onSubmit}>
        <OrganisationInput />
      </Wrapper>
    );

    await waitFor(() => {
      const input = screen.getByRole('combobox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('Mui-readOnly');
      expect(input).toHaveValue('Single Organisation');
    });

    // Verify submitted form data retains organisationId (readOnly vs disabled)
    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          organisationId: 'org-1',
        }),
        expect.anything()
      );
    });

    // Verify clear button is not rendered
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });

  it('does not preselect and leaves input enabled when there are multiple organisations', async () => {
    const dataProvider = testDataProvider({
      getList: vi.fn().mockResolvedValue({
        data: [
          { id: 'org-1', name: 'Organisation 1' },
          { id: 'org-2', name: 'Organisation 2' },
        ],
        total: 2,
      }),
      getMany: vi.fn().mockResolvedValue({
        data: [
          { id: 'org-1', name: 'Organisation 1' },
          { id: 'org-2', name: 'Organisation 2' },
        ],
      }),
    });

    render(
      <Wrapper dataProvider={dataProvider}>
        <OrganisationInput />
      </Wrapper>
    );

    await waitFor(() => {
      const input = screen.getByRole('combobox');
      expect(input).toBeInTheDocument();
      expect(input).not.toBeDisabled();
      expect(input).toHaveValue('');
    });

    // Clear button should not be present
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });

  it('preserves existing selection and is not clearable when multiple organisations exist', async () => {
    const dataProvider = testDataProvider({
      getList: vi.fn().mockResolvedValue({
        data: [
          { id: 'org-1', name: 'Organisation 1' },
          { id: 'org-2', name: 'Organisation 2' },
        ],
        total: 2,
      }),
      getMany: vi.fn().mockResolvedValue({
        data: [{ id: 'org-2', name: 'Organisation 2' }],
      }),
    });

    render(
      <Wrapper
        dataProvider={dataProvider}
        defaultValues={{ organisationId: 'org-2' }}
      >
        <OrganisationInput />
      </Wrapper>
    );

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
