import { test, expect } from '@playwright/test';

import { setupAuth } from './utils/auth/setupAuth';
import { browserTestAdminUser } from './utils/jwt/users';
import { routes } from './pages/routes';
import {
  eventsDetailPage,
  eventsListPage,
  eventsCreatePage,
  fillEventCreationForm,
  deleteEvent,
} from './pages/events';
import {
  eventGroupsDetailPage,
  createEventGroup,
  deleteEventGroup,
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
  const baseName = overrides.baseName ?? 'Browser test: breadcrumbs';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    shortDescription: overrides.shortDescription ?? 'Browser test event group',
    description: overrides.description ?? 'Testing breadcrumbs',
  };
}

function buildEvent(
  overrides: Partial<EventData & { baseName: string }> = {}
): EventData {
  const baseName = overrides.baseName ?? 'Browser test: breadcrumbs';
  return {
    name: `${baseName} ${new Date().toISOString()}`,
    participantsPerInvite: overrides.participantsPerInvite ?? 'Perhe',
    capacityPerOccurrence: overrides.capacityPerOccurrence ?? 5,
  };
}

test.describe('Breadcrumb feature', () => {
  let eventGroup: EventGroupData;
  let addEvent: EventData;

  test.beforeEach(async ({ page }) => {
    eventGroup = buildEventGroup();
    addEvent = buildEvent();
    await setupAuth(page, browserTestAdminUser);
    await page.goto(routes.eventsList());
  });

  test('As an admin I want to see a breadcrumb', async ({ page }) => {
    // Create a fresh event group
    await createEventGroup(page, eventGroup);
    await expect(eventGroupsDetailPage(page).title).toHaveText(eventGroup.name);
    const eventGroupName =
      (await eventGroupsDetailPage(page).title.textContent()) ?? '';

    // Event group detail: one breadcrumb back to the list
    const egBreadcrumbs = eventGroupsDetailPage(page).breadcrumbs;
    await expect(egBreadcrumbs).toHaveCount(1);
    await expect(egBreadcrumbs.nth(0)).toHaveText('Tapahtumalista');

    // Add an event to the event group. Mirrors the publish test in
    // eventGroupsFeature.spec.ts: 2-step URL wait + post-redirect title check.
    await eventGroupsDetailPage(page).addEventToEventGroupButton.click();
    await expect(eventsCreatePage(page).title).toBeVisible();
    await fillEventCreationForm(page, addEvent);
    await eventsCreatePage(page).submitButton.click();
    await page.waitForURL((url) => !url.pathname.startsWith('/events/create'));
    await expect(page).toHaveURL(/\/event-groups\/[^/]+\/show/);
    await expect(eventGroupsDetailPage(page).title).toHaveText(eventGroup.name);

    // Open the new event. getEvent auto-waits for the row to render.
    await eventGroupsDetailPage(page).getEvent(addEvent.name).click();
    await page.waitForURL(/\/events\/[^/]+\/show/);

    // Event detail: two breadcrumbs (list, then back to the event group)
    const evBreadcrumbs = eventsDetailPage(page).breadcrumbs;
    await expect(evBreadcrumbs).toHaveCount(2);
    await expect(evBreadcrumbs.nth(0)).toHaveText('Tapahtumat');
    await expect(evBreadcrumbs.nth(1)).toHaveText(eventGroupName);

    // Cleanup. After deleteEvent, react-admin redirects to the events list
    // (not back to the event group detail) — navigate via the list to the
    // event group before deleting it.
    await deleteEvent(page);
    await eventsListPage(page)
      .eventOrEventGroupByName(eventGroup.name)
      .first()
      .click();
    await deleteEventGroup(page);
  });
});
