import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import {
  eventsListPage,
  eventsCreatePage,
  fillEventCreationForm,
} from './events';

export function eventGroupsDetailPage(page: Page) {
  return {
    title: page.locator('h1'),
    eventListHeader: page.locator('.MuiTableHead-root > .MuiTableRow-root'),
    eventList: page.locator('.MuiTableBody-root'),
    breadcrumbs: page.locator('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
    editButton: page.getByRole('link', { name: /muokkaa/i }),
    addEventToEventGroupButton: page.getByRole('link', {
      name: /lisää tapahtuma/i,
    }),
    getEvent: (name: string) =>
      page
        .locator('.MuiTableBody-root tr td:first-child')
        .filter({ hasText: name }),
    publishButton: page.getByRole('button', {
      name: /Julkaise tapahtumaryhmä/i,
    }),
    publishConfirmButton: page.getByRole('button', { name: 'Vahvista' }),
  };
}

export function eventGroupsCreatePage(page: Page) {
  return {
    nameInput: page.getByLabel('Nimi *'),
    shortDescriptionInput: page.getByLabel('Lyhyt kuvaus'),
    descriptionInput: page.getByLabel('Kuvaus', { exact: true }),
    submitButton: page.getByRole('button', { name: 'Tallenna' }),
  };
}

export function eventGroupsEditPage(page: Page) {
  return {
    shortDescriptionInput: page.getByLabel('Lyhyt kuvaus'),
    saveButton: page.getByRole('button', { name: 'Tallenna' }),
    deleteButton: page.getByRole('button', { name: 'Poista' }),
    confirmDeleteButton: page.getByRole('button', { name: 'Vahvista' }),
  };
}

type CreateEventGroupValues = {
  name: string;
  shortDescription: string;
  description: string;
};

export async function createEventGroup(
  page: Page,
  values: CreateEventGroupValues
): Promise<void> {
  await eventsListPage(page).createEventGroupButton.click();

  const form = eventGroupsCreatePage(page);
  await form.nameInput.fill(values.name);
  await form.shortDescriptionInput.fill(values.shortDescription);
  await form.descriptionInput.fill(values.description);
  await form.submitButton.click();
}

export async function deleteEventGroup(page: Page): Promise<void> {
  await eventGroupsDetailPage(page).editButton.click();

  const edit = eventGroupsEditPage(page);
  await edit.deleteButton.click();
  await edit.confirmDeleteButton.click();
}

type CreateEvent = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

export async function createEventInEventGroup(
  page: Page,
  event: CreateEvent
): Promise<void> {
  await eventGroupsDetailPage(page).addEventToEventGroupButton.click();

  await expect(eventsCreatePage(page).title).toBeVisible();

  await fillEventCreationForm(page, event);
  await eventsCreatePage(page).submitButton.click();
}
