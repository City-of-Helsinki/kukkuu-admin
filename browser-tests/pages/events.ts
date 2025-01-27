import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

import { selectOption } from './select';
import type { TestController } from '../types';

export const eventsListPage = {
  title: screen.getByRole('heading', {
    name: /tapahtumat/i,
  }),
  listBody: Selector('.MuiTableBody-root'),
  anyEvent: Selector('.MuiTableBody-root tr').withText('TAPAHTUMA'),
  anyEventGroup: Selector('.MuiTableBody-root tr').withText('TAPAHTUMARYHMÄ'),
  eventOrEventGroupByName: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
  createEventGroupButton: screen.getByRole('link', {
    name: /uusi tapahtumaryhmä/i,
  }),
  createEventButton: screen.getByRole('link', {
    name: /^uusi tapahtuma$/i,
  }),
  getEvent: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
};

export const eventsDetailPage = {
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  editButton: screen.getByRole('link', {
    name: /muokkaa/i,
  }),
  title: (name: string) => Selector('h1').withExactText(name),
  readyToggle: screen.getByText(/Valmis julkaistavaksi/i),
  eventGroupLink: (name: string) => Selector('a').withExactText(name),
};

const eventForm = {
  nameInput: screen.getByLabelText(/Nimi/i),
  participantsPerInviteSelect: screen.getByLabelText(
    /Osallistujat kutsua kohden/i
  ),
  capacityPerOccurrence: screen.getByLabelText(/Esiintymän kapasiteetti/i),
  submitButton: screen.getByRole('button', { name: 'Tallenna' }),
};

export const eventsCreatePage = {
  title: Selector('h1').withExactText('Luo tapahtuma'),
  ...eventForm,
};

export const eventsEditPage = {
  ...eventForm,
  deleteButton: screen.getAllByRole('button', { name: 'Poista' }).nth(1),
  confirmDeleteButton: screen.getByRole('button', { name: 'Vahvista' }),
};

type CreateEvent = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

export async function fillCreationForm(t: TestController, event: CreateEvent) {
  await t.typeText(eventsCreatePage.nameInput, event.name);
  await selectOption(
    t,
    eventsCreatePage.participantsPerInviteSelect,
    event.participantsPerInvite
  );
  await t.typeText(
    eventsCreatePage.capacityPerOccurrence,
    event.capacityPerOccurrence.toString()
  );
}

export async function createEvent(t: TestController, event: CreateEvent) {
  await t.click(eventsListPage.createEventButton);

  // Fill the form and submit
  await fillCreationForm(t, event);

  await t.click(eventsCreatePage.submitButton);
}

export async function deleteEvent(t: TestController) {
  // Go to edit view
  await t.click(eventsDetailPage.editButton);

  // Delete the event
  await t.click(eventsEditPage.deleteButton);

  // Confirm the delete
  await t.click(eventsEditPage.confirmDeleteButton);

  // Wait for view data to sync
  await t.wait(100);
}
