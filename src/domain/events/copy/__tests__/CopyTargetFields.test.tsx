import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AdminContext, testDataProvider } from 'react-admin';
import { FormProvider, useForm } from 'react-hook-form';
import { vi } from 'vitest';
import * as apolloClient from '@apollo/client';

import { CopyTargetFields } from '../CopyTargetFields';
import {
  MyAdminProfileDocument,
  EventGroupsDocument,
} from '../../../api/generatedTypes/graphql';
import projectService from '../../../projects/projectService';

// Mock project service
projectService.projectId = 'project-1';

vi.spyOn(apolloClient, 'useQuery').mockImplementation((query, options: any) => {
  if (query === MyAdminProfileDocument) {
    return {
      data: {
        myAdminProfile: {
          projects: {
            edges: [
              { node: { id: 'project-1', year: 2023, name: 'Project 1' } },
              { node: { id: 'project-2', year: 2023, name: 'Project 2' } },
            ],
          },
        },
      },
    } as any;
  }
  if (query === EventGroupsDocument) {
    if (options.variables.projectId === 'project-1') {
      return {
        data: {
          eventGroups: {
            edges: [{ node: { id: 'group-1', name: 'Group 1' } }],
          },
        },
      } as any;
    }
    if (options.variables.projectId === 'project-2') {
      return {
        data: {
          eventGroups: {
            edges: [{ node: { id: 'group-2', name: 'Group 2' } }],
          },
        },
      } as any;
    }
  }
  return { data: null } as any;
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      projectId: 'project-1',
      eventGroupId: 'group-1',
    },
  });

  return (
    <AdminContext dataProvider={testDataProvider()}>
      <FormProvider {...methods}>
        <form data-testid="form">{children}</form>
      </FormProvider>
    </AdminContext>
  );
};

describe('CopyTargetFields', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('clears eventGroupId when projectId changes', async () => {
    render(
      <Wrapper>
        <CopyTargetFields resource="events" />
      </Wrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('combobox', { name: /projectId/i })
      ).toBeInTheDocument();
    });

    // Change project
    const projectSelect = screen.getByRole('combobox', { name: /projectId/i });

    fireEvent.mouseDown(projectSelect);

    const project2Option = await screen.findByText('2023 Project 2');
    fireEvent.click(project2Option);

    // eventGroupId should be cleared
    await waitFor(() => {
      const input = document.querySelector('input[name="eventGroupId"]');
      expect(input).toHaveValue('');
    });
  });
});
