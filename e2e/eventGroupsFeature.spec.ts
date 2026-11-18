import { test, expect } from '@playwright/test';

import { setupAuth } from './utils/auth/setupAuth';
import { browserTestAdminUser } from './utils/jwt/users';
import { routes } from './pages/routes';
import {
  eventsListPage,
  eventsCreatePage,
  eventsDetailPage,
  fillEventCreationForm,
  deleteEvent,
} from './pages/events';
import {
  eventGroupsDetailPage,
  eventGroupsEditPage,
  createEventGroup,
  deleteEventGroup,
  createEventInEventGroup,
  fillRegistrationOpensAt,
} from './pages/eventGroups';

type EventGroupData = {
  name: string;
  shortDescription: string;
  description: string;
};

type EventData = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

function buildEventGroup(
  overrides: Partial<EventGroupData & { baseName: string }> = {}
): EventGroupData {
  const baseName = overrides.baseName ?? 'Browser test: event group';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    shortDescription: overrides.shortDescription ?? 'Browser test event group',
    description:
      overrides.description ??
      // eslint-disable-next-line max-len
      'If you are seeing this event group, it means that a browser test has failed. You can use the date in the title to find out the date of the failure.',
  };
}

function buildEvent(
  overrides: Partial<EventData & { baseName: string }> = {}
): EventData {
  const baseName = overrides.baseName ?? 'Browser test: event';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    participantsPerInvite: overrides.participantsPerInvite ?? 'Perhe',
    capacityPerOccurrence: overrides.capacityPerOccurrence ?? 5,
  };
}

test.describe('Event groups feature', () => {
  let createEG: EventGroupData;
  let updateShortDescription: string;
  let addEvent: EventData;
  let publishEG: EventGroupData;

  test.beforeEach(async ({ page }) => {
    createEG = buildEventGroup();
    updateShortDescription = 'Browser test event group (updated)';
    addEvent = buildEvent();
    publishEG = buildEventGroup({
      baseName: 'Browser test: publish event group',
    });

    await setupAuth(page, browserTestAdminUser);
    await page.goto(routes.eventsList());
  });

  test('As an admin I want to see event groups within the event list', async ({
    page,
  }) => {
    // Create an event group to guarantee one exists in the list
    await createEventGroup(page, createEG);
    await page.goto(routes.eventsList());
    await expect(eventsListPage(page).title).toBeVisible();

    await expect(
      eventsListPage(page).eventOrEventGroupByName(createEG.name).first()
    ).toBeVisible();

    // Cleanup: delete the event group created for this test
    try {
      await eventsListPage(page)
        .eventOrEventGroupByName(createEG.name)
        .first()
        .click();
      await deleteEventGroup(page);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Cleanup failed: could not delete the event group created by this test.',
        error
      );
      throw error;
    }
  });

  test('As an admin I want to be able to open an event group and see the events in the event group', async ({
    page,
  }) => {
    // Create an event group to open
    await createEventGroup(page, createEG);
    await page.goto(routes.eventsList());
    await expect(eventsListPage(page).title).toBeVisible();

    const targetRow = eventsListPage(page).eventOrEventGroupByName(
      createEG.name
    );
    await expect(targetRow.first()).toBeVisible();
    await targetRow.first().click();

    // Assert we landed on the right detail page
    await expect(eventGroupsDetailPage(page).title).toHaveText(createEG.name);

    // Assert all expected column headers are present
    const header = eventGroupsDetailPage(page).eventListHeader;
    for (const col of [
      'Nimi',
      'Osallistujat kutsua kohden',
      'Kesto',
      'Kokonaiskapasiteetti',
      'Esiintymiä',
      'Ilmoittautuneita',
    ]) {
      await expect(header).toContainText(col);
    }

    // Add an event so the count assertion holds
    await createEventInEventGroup(page, addEvent);

    const eventList = eventGroupsDetailPage(page).eventList;
    await expect(eventList.locator('tr').first()).toBeVisible();

    // Cleanup: delete event and event group
    try {
      await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
      await deleteEvent(page);

      await eventsListPage(page)
        .eventOrEventGroupByName(createEG.name)
        .first()
        .click();
      await deleteEventGroup(page);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Cleanup failed: could not delete the event/event group created by this test.',
        error
      );
      throw error;
    }
  });

  test('As an admin I want to be able to create, update and delete event groups', async ({
    page,
  }) => {
    // Create event group
    await createEventGroup(page, createEG);

    // Go to edit view
    await eventGroupsDetailPage(page).editButton.click();

    // Edit short description and save
    const shortDescInput = eventGroupsEditPage(page).shortDescriptionInput;
    await shortDescInput.fill(updateShortDescription);
    await eventGroupsEditPage(page).saveButton.click();

    // After save, react-admin redirects to the events list
    await expect(eventsListPage(page).title).toBeVisible({ timeout: 15000 });

    // Cleanup: find the event group we created and delete it
    await eventsListPage(page)
      .eventOrEventGroupByName(createEG.name)
      .first()
      .click();
    await eventGroupsDetailPage(page).editButton.click();
    await eventGroupsEditPage(page).deleteButton.click();
    await eventGroupsEditPage(page).confirmDeleteButton.click();

    await expect(eventsListPage(page).title).toBeVisible({ timeout: 15000 });
  });

  test('As an admin I want to be able to add events to an event group', async ({
    page,
  }) => {
    // Create an event group to add an event to
    await createEventGroup(page, createEG);

    // Wait for the record to load before reading the title or clicking the
    // add-event button. The toolbar renders before the record is fetched, and
    // CreateButton's `to` prop captures `record?.id` at render time — so
    // clicking it too early ships `eventGroupId=undefined` to the backend.
    await expect(eventGroupsDetailPage(page).title).toHaveText(createEG.name);

    await createEventInEventGroup(page, addEvent);

    // First: confirm we left the create page (form actually submitted)
    await page.waitForURL((url) => !url.pathname.startsWith('/events/create'));
    // Then: confirm we landed on the event group detail page
    await expect(page).toHaveURL(/\/event-groups\/[^/]+\/show/);

    // Assert we are back on the correct event group detail page
    await expect(eventGroupsDetailPage(page).title).toHaveText(createEG.name);
    // Assert the created event appears in the event list
    await expect(
      eventGroupsDetailPage(page).getEvent(addEvent.name)
    ).toBeVisible();

    // Cleanup: delete the event and event group we just created
    try {
      await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
      await page.waitForURL(/\/events\/[^/]+\/show$/);
      await deleteEvent(page);
      await expect(
        eventGroupsDetailPage(page).getEvent(addEvent.name)
      ).toBeHidden();

      await eventsListPage(page)
        .eventOrEventGroupByName(createEG.name)
        .first()
        .click();
      await deleteEventGroup(page);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Cleanup failed: could not delete the event/event group created by this test. ' +
          'Dev-env data will be left stale.',
        error
      );
      throw error;
    }
  });

  test('As an admin I want to be able to publish an event group', async ({
    page,
  }) => {
    await createEventGroup(page, publishEG);

    // Wait for the record to load on the new detail page before clicking the
    // add-event button — same race as in the previous test.
    await expect(eventGroupsDetailPage(page).title).toHaveText(publishEG.name);

    // Add an event to the event group (required before publishing)
    await eventGroupsDetailPage(page).addEventToEventGroupButton.click();

    await expect(eventsCreatePage(page).title).toBeVisible();

    // Fill event form and save
    await fillEventCreationForm(page, addEvent);
    await eventsCreatePage(page).submitButton.click();

    // First: confirm we left the create page (form actually submitted)
    await page.waitForURL((url) => !url.pathname.startsWith('/events/create'));
    // Then: confirm we're on the event group detail page
    await expect(page).toHaveURL(/\/event-groups\/[^/]+\/show/);
    await expect(eventGroupsDetailPage(page).title).toHaveText(publishEG.name);

    // Mark the event as ready for publishing and wait for the toggle state to persist
    await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
    await eventsDetailPage(page).readyToggle.click();
    await expect(eventsDetailPage(page).readyCheckbox).toBeChecked();

    // Navigate back to event group detail page and wait for the detail record to load
    await eventsDetailPage(page).eventGroupLink(publishEG.name).click();
    await page.waitForURL(/\/event-groups\/[^/]+\/show/);
    await expect(eventGroupsDetailPage(page).title).toHaveText(publishEG.name);

    // Publish the event group
    await eventGroupsDetailPage(page).publishButton.click();
    await fillRegistrationOpensAt(page);
    await eventGroupsDetailPage(page).publishConfirmButton.click();

    // Navigate to the event group from the list and assert it is published
    await page.waitForURL(/\/events-and-event-groups$/);
    await expect(eventsListPage(page).title).toBeVisible();
    await eventsListPage(page)
      .eventOrEventGroupByName(publishEG.name)
      .first()
      .click();
    await expect(eventGroupsDetailPage(page).publishButton).toBeHidden();

    // Cleanup: delete event and event group
    try {
      await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
      await deleteEvent(page);

      await eventsListPage(page)
        .eventOrEventGroupByName(publishEG.name)
        .first()
        .click();
      await deleteEventGroup(page);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Cleanup failed: could not delete the event/event group created ' +
          'by this test. Dev-env data will be left stale.',
        error
      );
      throw error;
    }
  });
});
