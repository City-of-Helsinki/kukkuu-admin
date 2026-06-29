import { test, expect } from '@playwright/test';

import { setupAuth } from './utils/auth/setupAuth';
import { browserTestAdminUser } from './utils/jwt/users';
import { routes } from './pages/routes';
import {
  eventsListPage,
  eventsCreatePage,
  eventsDetailPage,
  eventsEditPage,
  fillEventCreationForm,
  deleteEvent,
} from './pages/events';

type EventData = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

function buildEvent(
  overrides: Partial<EventData & { baseName: string }> = {}
): EventData {
  const baseName = overrides.baseName ?? 'Browser test: event feature';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    participantsPerInvite: overrides.participantsPerInvite ?? 'Perhe',
    capacityPerOccurrence: overrides.capacityPerOccurrence ?? 5,
  };
}

test.describe('Events feature', () => {
  let createEvent: EventData;
  let updateEvent: EventData;

  test.beforeEach(async ({ page }) => {
    createEvent = buildEvent();
    updateEvent = buildEvent({
      baseName: 'Browser test: event feature (updated)',
    });

    await setupAuth(page, browserTestAdminUser);
    await page.goto(routes.eventsList());
  });

  test('As an admin I want to be able to create, update and delete events', async ({
    page,
  }) => {
    // Create
    await eventsListPage(page).createEventButton.click();
    await fillEventCreationForm(page, createEvent);
    await eventsCreatePage(page).submitButton.click();

    // Wait for redirect to event detail before reading/clicking the edit button.
    // Same record-loading race as eventGroupsFeature.spec.ts — react-admin's
    // edit-button `to` prop captures record.id at render time, so clicking it
    // too early sends an undefined id to the backend.
    await page.waitForURL(/\/events\/[^/]+\/show$/);
    await expect(eventsDetailPage(page).title(createEvent.name)).toBeVisible();

    // Edit name
    await eventsDetailPage(page).editButton.click();
    await page.waitForURL(/\/events\/[^/]+$/);
    await eventsEditPage(page).nameInput.fill(updateEvent.name);
    await eventsEditPage(page).submitButton.click();

    // Wait for redirect back to detail with the new name
    await page.waitForURL(/\/events\/[^/]+\/show$/);
    await expect(eventsDetailPage(page).title(updateEvent.name)).toBeVisible();

    // Delete (helper navigates: detail → edit → delete → confirm)
    await deleteEvent(page);

    // Assert redirect to list and absence of the deleted event
    await expect(eventsListPage(page).title).toBeVisible({ timeout: 15000 });
    await expect(
      eventsListPage(page).eventOrEventGroupByName(updateEvent.name)
    ).toHaveCount(0);
  });
});
