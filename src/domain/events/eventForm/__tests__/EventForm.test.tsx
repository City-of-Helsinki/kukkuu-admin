import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  AdminContext,
  type RaRecord,
  RecordContextProvider,
  ResourceContextProvider,
  SaveContextProvider,
  testDataProvider,
} from 'react-admin';
import { describe, it, expect, vi } from 'vitest';

import EventForm from '../EventForm';
import i18nProvider from '../../../../common/translation/i18nProvider';

const organisation = { id: 'org-1', name: 'Organisation' };
const rhythm = { id: 'path-1', slug: 'rhythm', name: 'Rhythm' };
const story = { id: 'path-2', slug: 'story', name: 'Story' };
const themePaths = [rhythm, story];

const dataProvider = testDataProvider({
  getList: vi
    .fn()
    .mockImplementation((resource: string) =>
      Promise.resolve(
        resource === 'organisations'
          ? { data: [organisation], total: 1 }
          : { data: themePaths, total: themePaths.length }
      )
    ),
  getMany: vi.fn().mockImplementation((resource: string) =>
    Promise.resolve({
      data: resource === 'organisations' ? [organisation] : themePaths,
    })
  ),
});

const renderEventForm = ({
  view,
  record,
}: {
  view: 'create' | 'edit';
  record?: RaRecord;
}) => {
  const save = vi.fn();
  render(
    <AdminContext dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <ResourceContextProvider value="events">
        <SaveContextProvider value={{ save }}>
          <RecordContextProvider value={record}>
            <EventForm view={view} />
          </RecordContextProvider>
        </SaveContextProvider>
      </ResourceContextProvider>
    </AdminContext>
  );
  return { save };
};

const eventWithName = {
  id: 'event-1',
  translations: { FI: { name: 'Test event' } },
};

describe('EventForm theme paths', () => {
  it('does not save a new event without a theme path', async () => {
    const { save } = renderEventForm({ view: 'create' });

    await userEvent.type(screen.getByLabelText(/^Nimi/), 'Test event');
    await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

    expect(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    ).toBeInvalid();
    expect(save).not.toHaveBeenCalled();
  });

  it('does not save an existing event whose theme paths were all removed', async () => {
    const { save } = renderEventForm({
      view: 'edit',
      record: { ...eventWithName, themePaths: [rhythm] },
    });

    await userEvent.click(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    );
    await userEvent.click(
      await screen.findByRole('option', { name: rhythm.name })
    );
    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

    expect(
      await screen.findByRole('combobox', { name: /^Teemapolut/ })
    ).toBeInvalid();
    expect(save).not.toHaveBeenCalled();
  });

  it('saves an existing event that has no theme paths', async () => {
    const { save } = renderEventForm({
      view: 'edit',
      record: { ...eventWithName, themePaths: [] },
    });

    await screen.findByRole('combobox', { name: /^Teemapolut/ });
    await userEvent.type(screen.getByLabelText(/^Nimi/), 'renamed');
    await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

    await waitFor(() => expect(save).toHaveBeenCalled());
  });
});
