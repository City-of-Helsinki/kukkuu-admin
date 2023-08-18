import {
  testUnauthorizedUsername,
  testUnauthorizedUserPassword,
} from './utils/settings';
import { routes } from './pages/routes';
import { login } from './utils/login';
import { unauthorized } from './pages/unauthorized';

fixture`Unauthorized feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t, {
      username: testUnauthorizedUsername(),
      password: testUnauthorizedUserPassword(),
    });
    await t.wait(3000);
  });

test('As a user without admin permissions I want to see an unauthorized page', async (t) => {
  await t.expect(unauthorized.title.exists).ok();
  await t.expect(unauthorized.logout.exists).ok();
});
