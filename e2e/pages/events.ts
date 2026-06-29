import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { selectMuiOption } from './select';

export function eventsListPage(page: Page) {
  return {
    title: page.getByRole('heading', { name: /tapahtumat/i }),
    listBody: page.locator('.MuiTableBody-root'),
    anyEvent: page.locator('.MuiTableBody-root tr', { hasText: 'TAPAHTUMA' }),
    anyEventGroup: page.locator('.MuiTableBody-root tr', {
      hasText: 'TAPAHTUMARYHMÄ',
    }),
    eventOrEventGroupByName: (name: string) =>
      page
        .locator('.MuiTableBody-root tr td:first-child')
        .filter({ hasText: name }),
    createEventGroupButton: page.getByRole('link', {
      name: /uusi tapahtumaryhmä/i,
    }),
    createEventButton: page.getByRole('link', { name: /^uusi tapahtuma$/i }),
  };
}

export function eventsCreatePage(page: Page) {
  return {
    title: page.getByRole('heading', { name: 'Luo tapahtuma', exact: true }),
    // react-admin's FieldTitle appends ` *` to required field labels — match
    // the literal rendered label.
    nameInput: page.getByLabel('Nimi *'),
    // MUI Select renders the interactive element with role="combobox". Use
    // that role explicitly — getByLabel on a Select may resolve to a
    // non-clickable element depending on MUI internals.
    participantsPerInviteSelect: page.getByRole('combobox', {
      name: 'Osallistujat kutsua kohden',
    }),
    capacityPerOccurrence: page.getByLabel('Esiintymän kapasiteetti *'),
    submitButton: page.getByRole('button', { name: 'Tallenna' }),
  };
}

export function eventsDetailPage(page: Page) {
  return {
    title: (name: string) => page.getByRole('heading', { name, exact: true }),
    editButton: page.getByRole('link', { name: /muokkaa/i }),
    readyToggle: page.getByText(/Valmis julkaistavaksi/i),
    eventGroupLink: (name: string) =>
      page.getByRole('link', { name, exact: true }),
    breadcrumbs: page.locator('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  };
}

export function eventsEditPage(page: Page) {
  return {
    nameInput: page.getByLabel('Nimi *'),
    submitButton: page.getByRole('button', { name: 'Tallenna' }),
    // The edit toolbar has two "Poista" buttons (occurrence-level and event-level).
    // The second one deletes the event itself.
    deleteButton: page.getByRole('button', { name: 'Poista' }).nth(1),
    confirmDeleteButton: page.getByRole('button', { name: 'Vahvista' }),
  };
}

type CreateEvent = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

export async function fillEventCreationForm(
  page: Page,
  event: CreateEvent
): Promise<void> {
  const form = eventsCreatePage(page);
  await form.nameInput.fill(event.name);
  await selectMuiOption(
    page,
    form.participantsPerInviteSelect,
    event.participantsPerInvite
  );
  // Sanity check: confirm the combobox actually shows the selected value.
  // If this fails, the form will silently reject the submit on validation.
  await expect(form.participantsPerInviteSelect).toHaveText(
    event.participantsPerInvite
  );
  await form.capacityPerOccurrence.fill(event.capacityPerOccurrence.toString());
}

export async function deleteEvent(page: Page): Promise<void> {
  await eventsDetailPage(page).editButton.click();
  await eventsEditPage(page).deleteButton.click();
  await eventsEditPage(page).confirmDeleteButton.click();
}
