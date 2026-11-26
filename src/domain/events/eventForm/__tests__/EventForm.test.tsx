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
import { TicketSystem } from '../../../api/generatedTypes/graphql';
import extendedDataProvider from '../../../../api/dataProvider';
import * as apiUtils from '../../../../api/utils/apiUtils';

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
  save: customSave,
}: {
  view: 'create' | 'edit';
  record?: RaRecord;
  save?: (data: any) => Promise<any> | void;
}) => {
  const save = customSave ?? vi.fn();
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

  describe('ticketSystem.endTime past validation', () => {
    const pastEndTime = '2020-01-01T12:00';
    const externalTicketSystemEvent = {
      ...eventWithName,
      themePaths: [rhythm],
      ticketSystem: {
        type: TicketSystem.Ticketmaster,
        url: 'https://example.com',
        endTime: pastEndTime,
      },
    };

    it('does not save a new event with a past end time', async () => {
      const { save } = renderEventForm({
        view: 'create',
        record: externalTicketSystemEvent,
      });

      await screen.findByRole('combobox', { name: /^Teemapolut/ });
      await userEvent.type(screen.getByLabelText(/^Nimi/), ' dirty form');
      await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

      expect(save).not.toHaveBeenCalled();
    });

    it('saves an existing event with a past end time', async () => {
      const { save } = renderEventForm({
        view: 'edit',
        record: externalTicketSystemEvent,
      });

      await screen.findByRole('combobox', { name: /^Teemapolut/ });
      await userEvent.type(screen.getByLabelText(/^Nimi/), ' updated');
      await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

      await waitFor(() => expect(save).toHaveBeenCalled());
    });
  });

  describe('external ticket system GraphQL mutation inputs', () => {
    it('includes updated URL and end time in GraphQL mutation inputs when saved', async () => {
      const mutationHandlerSpy = vi
        .spyOn(apiUtils, 'mutationHandler')
        .mockResolvedValue({
          data: { updateEvent: { event: { id: 'event-1' } } },
        });

      const externalEvent = {
        ...eventWithName,
        themePaths: [rhythm],
        ticketSystem: {
          type: TicketSystem.Ticketmaster,
          url: 'https://old-url.example.com',
          endTime: '2026-10-01T12:00',
        },
      };

      renderEventForm({
        view: 'edit',
        record: externalEvent,
        save: (data) =>
          extendedDataProvider.update('events', {
            id: externalEvent.id,
            data,
            previousData: externalEvent,
          }),
      });

      await screen.findByRole('combobox', { name: /^Teemapolut/ });

      const urlInput = screen.getByLabelText(/^Tapahtuman URL-osoite/);
      await userEvent.clear(urlInput);
      await userEvent.type(urlInput, 'https://new-url.example.com');

      const endTimeInput = screen.getByLabelText(/^Loppuaika/);
      await userEvent.clear(endTimeInput);
      await userEvent.type(endTimeInput, '2026-12-31T18:00');

      await userEvent.click(screen.getByRole('button', { name: 'Tallenna' }));

      await waitFor(() => {
        expect(mutationHandlerSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: expect.objectContaining({
                id: 'event-1',
                ticketSystem: expect.objectContaining({
                  url: 'https://new-url.example.com',
                  endTime: expect.stringContaining('2026-12-31'),
                }),
              }),
            },
          })
        );
      });
    });
  });

  describe('occurrence notice', () => {
    const noticeText = /^Määritä kielet ja saavutettavuus/;

    it('is shown when creating an event', async () => {
      renderEventForm({ view: 'create' });

      expect(await screen.findByText(noticeText)).toBeInTheDocument();
    });

    it('is shown when editing an external event', async () => {
      renderEventForm({
        view: 'edit',
        record: {
          ...eventWithName,
          themePaths: [rhythm],
          ticketSystem: { type: TicketSystem.Ticketmaster },
        },
      });

      expect(await screen.findByText(noticeText)).toBeInTheDocument();
    });

    it('is not shown when editing an internal event', async () => {
      renderEventForm({
        view: 'edit',
        record: {
          ...eventWithName,
          themePaths: [rhythm],
          ticketSystem: { type: TicketSystem.Internal },
        },
      });

      await screen.findByRole('combobox', { name: /^Teemapolut/ });
      expect(screen.queryByText(noticeText)).not.toBeInTheDocument();
    });
  });
});
