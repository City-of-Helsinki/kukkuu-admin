import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

import {
  eventsCreatePage,
  eventsListPage,
  fillCreationForm as fillEventCreationForm,
} from './events';
import type { TestController } from '../types';

export const eventGroupsDetailPage = {
  title: Selector('h1'),
  eventListHeader: Selector('.MuiTableHead-root > .MuiTableRow-root'),
  eventList: Selector('.MuiTableBody-root'),
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  editButton: screen.getByRole('link', { name: /muokkaa/i }),
  addEventToEventGroupButton: screen.getByRole('link', {
    name: /lisää tapahtuma/i,
  }),
  getEvent: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
  publishButton: screen.queryByRole('button', {
    name: /Julkaise tapahtumaryhmä/i,
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

export async function createEventInEventGroup(t: TestController, event) {
  // Go to view for adding an event into the event group
  await t.click(eventGroupsDetailPage.addEventToEventGroupButton);

  // Assert that we are in the event creation view
  await t.expect(eventsCreatePage.title.exists).ok();

  // Fill the form and submit
  await fillEventCreationForm(t, event);
  await t.click(eventsCreatePage.submitButton);
}
