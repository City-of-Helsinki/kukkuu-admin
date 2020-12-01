import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

import { eventsListPage } from './events';

export const eventGroupsDetailPage = {
  title: Selector('h1'),
  eventListHeader: Selector('.MuiTableHead-root > .MuiTableRow-root'),
  eventList: Selector('.MuiTableBody-root'),
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  editButton: screen.getByRole('button', { name: 'Muokkaa' }),
  addEventToEventGroupButton: screen.getByRole('button', {
    name: 'Lisää tapahtuma',
  }),
  getEvent: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
  publishButton: screen.queryByRole('button', {
    name: 'Julkaise tapahtumaryhmä',
  }),
  publishConfirmButton: screen.getByRole('button', { name: 'Vahvista' }),
};

export const eventGroupsCreatePage = {
  nameInput: screen.getByLabelText('Nimi *'),
  shortDescriptionInput: screen.getByLabelText('Lyhyt kuvaus'),
  descriptionInput: screen.getByLabelText('Kuvaus'),
  submitButton: screen.getByRole('button', { name: 'Tallenna' }),
};

export const eventGroupsEditPage = {
  shortDescriptionInput: screen.getByLabelText('Lyhyt kuvaus'),
  saveButton: screen.getByRole('button', { name: 'Tallenna' }),
  deleteButton: screen.getByRole('button', { name: 'Poista' }),
  confirmDeleteButton: screen.getByRole('button', { name: 'Vahvista' }),
};

type CreateEventGroup = {
  name: string;
  shortDescription: string;
  description: string;
};

export async function fillCreationForm(
  t: TestController,
  values: CreateEventGroup
) {
  await t
    .typeText(eventGroupsCreatePage.nameInput, values.name)
    .typeText(
      eventGroupsCreatePage.shortDescriptionInput,
      values.shortDescription
    )
    .typeText(eventGroupsCreatePage.descriptionInput, values.description);
}

export async function createEventGroup(
  t: TestController,
  values: CreateEventGroup
) {
  // From event list go to event group creation form
  await t.click(eventsListPage.createEventGroupButton);

  // Fill the form and submit it
  await fillCreationForm(t, values);
  await t.click(eventGroupsCreatePage.submitButton);
}

export async function deleteEventGroup(t: TestController) {
  // From event group details go to edit view
  await t.click(eventGroupsDetailPage.editButton);

  // Delete event group
  await t
    .click(eventGroupsEditPage.deleteButton)
    .click(eventGroupsEditPage.confirmDeleteButton);
}
