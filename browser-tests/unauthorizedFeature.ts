import { routes } from './pages/routes';
import { unauthorized } from './pages/unauthorized';
import { unauthorizedAdmin } from './userRoles';
import {
  AuthServiceRequestInterceptor,
  KukkuuApiTestJwtBearerAuthorization,
} from './utils/jwt/mocks/testJWTAuthRequests';
import { browserTestUnauthorizedAdminUser } from './utils/jwt/users';

fixture`Unauthorized feature`.page(routes.eventsList()).requestHooks([
  // Use AuthServiceRequestInterceptor to mock Keycloak out.
  new AuthServiceRequestInterceptor(browserTestUnauthorizedAdminUser),
  // Use KukkuuApiTestJwtBearerAuthorization to add auth header to every API request.
  new KukkuuApiTestJwtBearerAuthorization(browserTestUnauthorizedAdminUser),
]);

test('As a user without admin permissions I want to see an unauthorized page', async (t) => {
  // Use authorizedGuardian guardian role to populate session storage
  await t.useRole(unauthorizedAdmin);

  await t.wait(3000);
  await t.expect(unauthorized.title.exists).ok();
  await t.expect(unauthorized.logout.exists).ok();
});
