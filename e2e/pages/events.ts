import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { selectMuiOption, selectMuiOptions } from './select';

export function eventsListPage(page: Page) {
  return {
    title: page.getByRole('heading', { name: 'Tapahtumat', exact: true }),
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
    themePathsSelect: page.getByRole('combobox', { name: 'Teemapolut' }),
    capacityPerOccurrence: page.getByLabel('Esiintymän kapasiteetti *'),
    submitButton: page.getByRole('button', { name: 'Tallenna' }),
  };
}

export function eventsDetailPage(page: Page) {
  return {
    title: (name: string) => page.getByRole('heading', { name, exact: true }),
    editButton: page.getByRole('link', { name: /muokkaa/i }),
    readyToggle: page.getByText(/Valmis julkaistavaksi/i),
    // Exact match, so that the event group's "Julkaise tapahtumaryhmä" button
    // is not matched.
    publishButton: page.getByRole('button', { name: 'Julkaise', exact: true }),
    publishConfirmButton: page.getByRole('button', { name: 'Vahvista' }),
    eventGroupLink: (name: string) =>
      page.getByRole('link', { name, exact: true }),
    breadcrumbs: page.locator('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  };
}

export function eventsEditPage(page: Page) {
  return {
    nameInput: page.getByLabel('Nimi *'),
    themePathsSelect: page.getByRole('combobox', { name: 'Teemapolut' }),
    submitButton: page.getByRole('button', { name: 'Tallenna' }),
    // Scope to the form's toolbar (react-admin renders it with role="toolbar")
    // rather than picking a "Poista" button by position — other "Poista"
    // controls can exist elsewhere on the page (e.g. an uploaded image's
    // remove button uses the same Finnish label), and a positional index
    // silently breaks if the count or order ever changes.
    deleteButton: page
      .getByRole('toolbar')
      .getByRole('button', { name: 'Poista' }),
    confirmDeleteButton: page.getByRole('button', { name: 'Vahvista' }),
  };
}

type CreateEvent = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
  // Names of the theme paths to select. Defaults to the "Rytmi" theme path.
  themePaths?: string[];
};

export async function fillEventCreationForm(
  page: Page,
  event: CreateEvent
): Promise<void> {
  const form = eventsCreatePage(page);
  await form.nameInput.fill(event.name);
  const themePaths = event.themePaths ?? ['Rytmi'];
  await selectMuiOptions(page, form.themePathsSelect, themePaths);
  for (const themePath of themePaths) {
    await expect(form.themePathsSelect).toContainText(themePath);
  }
  await selectMuiOption(
    page,
    form.participantsPerInviteSelect,
    event.participantsPerInvite
  );
  // Sanity check: confirm the combobox actually shows the selected value.
  // If this fails, the form will silently reject the submit on validation..
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
