import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

import { selectOption } from './select';

export const eventsListPage = {
  title: Selector('h1').withExactText('Tapahtumat'),
  listBody: Selector('.MuiTableBody-root'),
  anyEventGroup: Selector('.MuiTableBody-root tr').withText('TAPAHTUMARYHMÄ'),
  eventOrEventGroupByName: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
  createEventGroupButton: screen.getByRole('button', {
    name: 'Uusi tapahtumaryhmä',
  }),
  createEventButton: screen.getByRole('button', {
    name: 'Uusi tapahtuma',
  }),
};

export const eventsDetailPage = {
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  editButton: screen.getByRole('button', {
    name: 'Muokkaa',
  }),
  title: (name: string) => Selector('h1').withExactText(name),
};

const eventForm = {
  nameInput: screen.getByLabelText('Nimi *'),
  participantsPerInviteSelect: screen.getByLabelText(
    'Osallistujat kutsua kohden *'
  ),
  capacityPerOccurrence: screen.getByLabelText('Esiintymän kapasiteetti *'),
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
