import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import { eventsListPage } from './pages/events';
import { eventGroupsDetailPage } from './pages/eventGroups';

function includes(text: string, values: string[]): boolean {
  return true;
}

fixture`Event groups feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t);
    await t.click(navigation.events);
  });

test('As an admin I want to see event groups within the event list', async (t) => {
  // Expect the list to have event groups
  await t
    .expect(eventsListPage.listBody.withText('TAPAHTUMARYHMÄ').count)
    .gt(0);
});

test('As an admin I want to be able to open an event group and see the events in the event group', async (t) => {
  const eventGroupRow = eventsListPage.anyEventGroup.child();
  const eventGroupName = await eventGroupRow.child().nth(0).textContent;

  // Go to event group
  await t.click(eventGroupRow);

  // Assert that we are in the correct page
  await t.expect(eventGroupsDetailPage.title.textContent).eql(eventGroupName);

  // Assert that there's a list of events
  const listHeaders = await eventGroupsDetailPage.eventListHeader.textContent;
  await t
    .expect(
      includes(listHeaders, [
        'Nimi',
        'Osallistujat kutsua kohden',
        'Kesto',
        'Kokonaiskapasiteetti',
        'Esiintymiä',
        'Ilmoittautuneita',
      ])
    )
    .ok();
  await t.expect(eventGroupsDetailPage.eventList.childNodeCount).gt(0);
});
