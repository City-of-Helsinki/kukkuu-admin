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
import { fillRegistrationOpensAt } from './pages/eventGroups';

type EventData = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
  themePaths: string[];
};

function buildEvent(
  overrides: Partial<EventData & { baseName: string }> = {}
): EventData {
  const baseName = overrides.baseName ?? 'Browser test: event feature';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    participantsPerInvite: overrides.participantsPerInvite ?? 'Perhe',
    capacityPerOccurrence: overrides.capacityPerOccurrence ?? 5,
    themePaths: overrides.themePaths ?? ['Rytmi', 'Tarina'],
  };
}

test.describe('Events feature', () => {
  let createEvent: EventData;
  let updateEvent: EventData;
  let publishEvent: EventData;

  test.beforeEach(async ({ page }) => {
    createEvent = buildEvent();
    updateEvent = buildEvent({
      baseName: 'Browser test: event feature (updated)',
    });
    publishEvent = buildEvent({ baseName: 'Browser test: publish event' });

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
    await expect(
      eventsDetailPage(page).themePaths(createEvent.themePaths)
    ).toBeVisible();

    // Edit name
    await eventsDetailPage(page).editButton.click();
    await page.waitForURL(/\/events\/[^/]+$/);
    // The theme paths chosen on create must be preselected on edit.
    for (const themePath of createEvent.themePaths) {
      await expect(eventsEditPage(page).themePathsSelect).toContainText(
        themePath
      );
    }
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

  test('As an admin I want to be able to publish an event', async ({
    page,
  }) => {
    await eventsListPage(page).createEventButton.click();
    await fillEventCreationForm(page, publishEvent);
    await eventsCreatePage(page).submitButton.click();

    // Wait for the record to load on the detail page before publishing — same
    // record-loading race as in the previous test.
    await page.waitForURL(/\/events\/[^/]+\/show$/);
    await expect(eventsDetailPage(page).title(publishEvent.name)).toBeVisible();

    // Publish the event
    await eventsDetailPage(page).publishButton.click();
    await fillRegistrationOpensAt(page);
    await eventsDetailPage(page).publishConfirmButton.click();

    // Publishing redirects to the list. Open the event from the list and assert
    // that it is published, i.e. that the publish button is not shown.
    await eventsListPage(page)
      .eventOrEventGroupByName(publishEvent.name)
      .first()
      .click();
    await expect(eventsDetailPage(page).title(publishEvent.name)).toBeVisible();
    await expect(eventsDetailPage(page).publishButton).toBeHidden();

    // Cleanup: delete the event
    try {
      await deleteEvent(page);
      await expect(eventsListPage(page).title).toBeVisible({ timeout: 15000 });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Cleanup failed: could not delete the event created by this test. ' +
          'Dev-env data will be left stale.',
        error
      );
      throw error;
    }
  });
});
