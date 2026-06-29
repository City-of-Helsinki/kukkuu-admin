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
  const baseName =
    overrides.baseName ?? 'Browser test: add event to event group';
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
  const baseName =
    overrides.baseName ?? 'Browser test: add event to event group';
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
    const anyEventGroup = eventsListPage(page).anyEventGroup;

    // If no event group exists yet, create one so the assertion is not vacuous
    if ((await anyEventGroup.count()) === 0) {
      await createEventGroup(page, createEG);
      await page.goto(routes.eventsList());
    }

    await expect(anyEventGroup.first()).toBeVisible();
  });

  test('As an admin I want to be able to open an event group and see the events in the event group', async ({
    page,
  }) => {
    const anyEventGroup = eventsListPage(page).anyEventGroup;

    // If no event group exists yet, create one
    if ((await anyEventGroup.count()) === 0) {
      await createEventGroup(page, createEG);
      await page.goto(routes.eventsList());
    }

    // Grab the name from the first cell of the first event-group row
    const eventGroupName = await anyEventGroup
      .first()
      .locator('td')
      .first()
      .textContent();

    await anyEventGroup.first().click();

    // Assert we landed on the right detail page
    await expect(eventGroupsDetailPage(page).title).toHaveText(
      eventGroupName ?? ''
    );

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

    // If the event list is empty, add an event so the count assertion holds
    const eventList = eventGroupsDetailPage(page).eventList;
    if ((await eventList.locator('tr').count()) === 0) {
      await createEventInEventGroup(page, addEvent);
    }

    await expect(eventList.locator('tr').first()).toBeVisible();
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
    const anyEventGroup = eventsListPage(page).anyEventGroup;

    // Select any existing event group
    await anyEventGroup.first().click();

    // Wait for the record to load before reading the title or clicking the
    // add-event button. The toolbar renders before the record is fetched, and
    // CreateButton's `to` prop captures `record?.id` at render time — so
    // clicking it too early ships `eventGroupId=undefined` to the backend.
    await expect(eventGroupsDetailPage(page).title).toHaveText(/.+/);

    // Save the event group name so we can assert on it later
    const eventGroupName =
      (await eventGroupsDetailPage(page).title.textContent()) ?? '';

    await createEventInEventGroup(page, addEvent);

    // First: confirm we left the create page (form actually submitted)
    await page.waitForURL((url) => !url.pathname.startsWith('/events/create'));
    // Then: confirm we landed on the event group detail page
    await expect(page).toHaveURL(/\/event-groups\/[^/]+\/show/);

    // Assert we are back on the correct event group detail page
    await expect(eventGroupsDetailPage(page).title).toHaveText(eventGroupName);
    // Assert the created event appears in the event list
    await expect(
      eventGroupsDetailPage(page).getEvent(addEvent.name)
    ).toBeVisible();

    // Cleanup: delete the event we just created
    try {
      await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
      await page.waitForURL(/\/events\/[^/]+\/show$/);
      await deleteEvent(page);
      await expect(
        eventGroupsDetailPage(page).getEvent(addEvent.name)
      ).toBeHidden();
    } catch {
      // If cleanup fails the dev-env data is stale but the test result is still valid
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

    // Mark the event as ready for publishing
    await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
    await eventsDetailPage(page).readyToggle.click();

    // Navigate back to event group detail page
    await eventsDetailPage(page).eventGroupLink(publishEG.name).click();

    // Publish the event group
    await eventGroupsDetailPage(page).publishButton.click();
    await eventGroupsDetailPage(page).publishConfirmButton.click();

    // Navigate to the event group from the list and assert it is published
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
    } catch {
      // Stale dev-env data if cleanup fails; test result stands
    }
  });
});
