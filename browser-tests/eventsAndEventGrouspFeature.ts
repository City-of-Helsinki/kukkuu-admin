import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import { eventsListPage } from './pages/events';

fixture`Event groups feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t);
    await t.click(navigation.events);
  });

test('As an admin I want to see events groups within the event list', async (t) => {
  // Expect the list to have event groups
  await t
    .expect(eventsListPage.listBody.withText('TAPAHTUMARYHMÄ').count)
    .gt(0);
});
