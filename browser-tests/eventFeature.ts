import { fixture } from 'testcafe';

import { routes } from './pages/routes';
import { navigation } from './pages/navigation';
import {
  eventsListPage,
  eventsCreatePage,
  eventsDetailPage,
  eventsEditPage,
  fillCreationForm,
  deleteEvent,
} from './pages/events';
import {
  AuthServiceRequestInterceptor,
  KukkuuApiTestJwtBearerAuthorization,
} from './utils/jwt/mocks/testJWTAuthRequests';
import { browserTestAdminUser } from './utils/jwt/users';
import { authorizedAdmin } from './userRoles';

function buildEvent(overrides: any = {}) {
  return {
    name: `Browser test: event feature ${new Date().toISOString()}`,
    participantsPerInvite: 'Perhe',
    capacityPerOccurrence: 5,
    ...overrides,
  };
}

fixture`Events feature`
  .requestHooks([
    // Use AuthServiceRequestInterceptor to mock Keycloak out.
    new AuthServiceRequestInterceptor(browserTestAdminUser),
    // Use KukkuuApiTestJwtBearerAuthorization to add auth header to every API request.
    new KukkuuApiTestJwtBearerAuthorization(browserTestAdminUser),
  ])
  .beforeEach(async (t) => {
    // Use authorizedGuardian guardian role to populate session storage
    await t.useRole(authorizedAdmin).navigateTo(routes.eventsList());

    await t.click(navigation.events);

    t.ctx.createEvent = buildEvent();
    t.ctx.updateEvent = buildEvent({
      name: `Browser test: event feature (updated) ${new Date().toISOString()}`,
    });
  })
  .afterEach(async (t) => {
    delete t.ctx.createEvent;
    delete t.ctx.updateEvent;
  });

test('As an admin I want to be able to create, update and delete events', async (t) => {
  const { updateEvent, createEvent } = t.ctx;

  // Go to creation form
  await t.click(eventsListPage.createEventButton);

  // Fill the form and submit it
  await fillCreationForm(t, createEvent);
  await t.click(eventsCreatePage.submitButton);

  // Assert that we have been redirected to the events details
  await t.expect(eventsDetailPage.title(createEvent.name).exists).ok();

  // Wait some time for data to be fetched, so that the edit button
  // points to the correct resource.
  await t.wait(1000);
  // Go to edit view
  await t.click(eventsDetailPage.editButton);

  // Edit short description and save
  await t
    .selectText(eventsEditPage.nameInput)
    .typeText(eventsEditPage.nameInput, updateEvent.name)
    .click(eventsEditPage.submitButton);

  // Assert that we have been redirected to the events details
  await t.expect(eventsDetailPage.title(updateEvent.name).exists).ok();

  await deleteEvent(t);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();

  // And that the event no longer exists
  await t
    .expect(eventsListPage.eventOrEventGroupByName(updateEvent.name).exists)
    .notOk();
});
