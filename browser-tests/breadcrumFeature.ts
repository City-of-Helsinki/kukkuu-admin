import { fixture } from 'testcafe';

import { routes } from './pages/routes';
import { navigation } from './pages/navigation';
import { eventsListPage, eventsDetailPage } from './pages/events';
import {
  createEventGroup,
  createEventInEventGroup,
  eventGroupsDetailPage,
} from './pages/eventGroups';
import {
  AuthServiceRequestInterceptor,
  KukkuuApiTestJwtBearerAuthorization,
} from './utils/jwt/mocks/testJWTAuthRequests';
import { browserTestAdminUser } from './utils/jwt/users';
import { authorizedAdmin } from './userRoles';

function buildEventGroup(overrides: any = {}) {
  const { name = 'Browser test: breadcrumbs', ...rest } = overrides;

  return {
    name: `${name} ${new Date().toISOString()}`,
    shortDescription: 'Browser test event group',
    description:
      // eslint-disable-next-line max-len
      'Testing breadcrumbs',
    ...rest,
  };
}

function buildEvent(overrides: any = {}) {
  const { name = 'Browser test: breadcrumbs', ...rest } = overrides;

  return {
    name: `${name} ${new Date().toISOString()}`,
    participantsPerInvite: 'Perhe',
    capacityPerOccurrence: 5,
    ...rest,
  };
}

fixture`Breadcrumb feature`
  .requestHooks([
    // Use AuthServiceRequestInterceptor to mock Keycloak out.
    new AuthServiceRequestInterceptor(browserTestAdminUser),
    // Use KukkuuApiTestJwtBearerAuthorization to add auth header to every API request.
    new KukkuuApiTestJwtBearerAuthorization(browserTestAdminUser),
  ])
  .beforeEach(async (t) => {
    t.ctx.createEventGroup = buildEventGroup();
    t.ctx.addEventToEventGroup = buildEvent();
    // Use authorizedGuardian guardian role to populate session storage
    await t.useRole(authorizedAdmin).navigateTo(routes.eventsList());
  });

// I don't know if the breadcrumb feature deserves its own fixtures. If
// it doesn't seem feasible in the long run, they can be moved under
// other fixtures. This fixture has been implemented according to the
// original user story.
test('As an admin I want to see a breadcrumb', async (t) => {
  // Goto events and select any event group. This view uses a simple
  // breadcrumb.

  const { name, shortDescription, description } = t.ctx.createEventGroup;
  const eventInEventGroup = t.ctx.addEventToEventGroup;
  if ((await eventsListPage.anyEventGroup.count) === 0) {
    // Go to creation form
    await createEventGroup(t, { name, shortDescription, description });
    // Navigate to the list
    await t.navigateTo(routes.eventsList());
  }

  await t.click(navigation.events).click(eventsListPage.anyEventGroup);

  await t.expect(eventGroupsDetailPage.breadcrumbs.count).eql(1);
  await t
    .expect(eventGroupsDetailPage.breadcrumbs.textContent)
    .eql('Tapahtumalista');

  // Then check an event within an event group. This view uses a more
  // complex breadcrumb.
  const eventGroupsName = await eventGroupsDetailPage.title.textContent;
  if ((await eventGroupsDetailPage.eventList.childElementCount) === 0) {
    await createEventInEventGroup(t, eventInEventGroup);
  }
  await t.click(eventGroupsDetailPage.eventList.nth(0));
  await t.expect(eventsDetailPage.breadcrumbs.count).eql(2);
  await t
    .expect(eventsDetailPage.breadcrumbs.nth(0).textContent)
    .eql('Tapahtumat');
  await t
    .expect(eventsDetailPage.breadcrumbs.nth(1).textContent)
    .eql(eventGroupsName);
});
