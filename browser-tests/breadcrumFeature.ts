import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import { eventsListPage, eventsDetailPage } from './pages/events';
import { eventGroupsDetailPage } from './pages/eventGroups';

fixture`Breadcrumb feature`.page(routes.eventsList()).beforeEach(async (t) => {
  await login(t);
});

// I don't know if the breadcrumb feature deserves its own fixtures. If
// it doesn't seem feasible in the long run, they can be moved under
// other fixtures. This fixture has been implemented according to the
// original user story.
test('As an admin I want to see a breadcrumb', async (t) => {
  // Goto events and select any event group. This view uses a simple
  // breadcrumb.
  await t.click(navigation.events).click(eventsListPage.anyEventGroup);

  await t.expect(eventGroupsDetailPage.breadcrumbs.count).eql(1);
  await t
    .expect(eventGroupsDetailPage.breadcrumbs.textContent)
    .eql('Tapahtumalista');

  // Then check an event within an event group. This view uses a more
  // complex breadcrumb.
  const eventGroupsName = await eventGroupsDetailPage.title.textContent;
  await t.click(eventGroupsDetailPage.eventList.nth(0));
  await t.expect(eventsDetailPage.breadcrumbs.count).eql(2);
  await t
    .expect(eventsDetailPage.breadcrumbs.nth(0).textContent)
    .eql('Tapahtumat');
  await t
    .expect(eventsDetailPage.breadcrumbs.nth(1).textContent)
    .eql(eventGroupsName);
});
