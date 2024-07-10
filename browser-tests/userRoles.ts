import { Role } from 'testcafe';

import { authorize } from './utils/jwt/clientUtils/login';
import { envUrl } from './utils/settings';
import {
  browserTestAdminUser,
  browserTestUnauthorizedAdminUser,
} from './utils/jwt/users';

/**
 * Use authorizedAdmin user role to populate session storage
 * with the test JWT token.
 *
 * NOTE: The request hooks are also needed to successfully use the test JWT.
 * @example
 * .requestHooks([
 *   // Use AuthServiceRequestInterceptor to mock Keycloak out.
 *   new AuthServiceRequestInterceptor(browserTestAdminUser),
 *   // Use KukkuuApiTestJwtBearerAuthorization to add auth header to every API request.
 *   new KukkuuApiTestJwtBearerAuthorization(browserTestAdminUser),
 * ])
 * .beforeEach(async (t) => {
 *   // Use authorizedAdmin guardian role to populate session storage
 *   await t.useRole(authorizedAdmin).navigateTo(route());
 * });
 */
export const authorizedAdmin = Role(`${envUrl()}/login`, async (t) => {
  // eslint-disable-next-line no-console
  console.info('Use "authorizedAdmin" role.');
  await authorize(t, browserTestAdminUser);
  const currentLocalStorage = await t.eval(() => ({
    ...window.localStorage,
  }));
  // eslint-disable-next-line no-console
  console.debug('authorizedAdmin', 'currentLocalStorage', currentLocalStorage);
});

export const unauthorizedAdmin = Role(`${envUrl()}/login`, async (t) => {
  // eslint-disable-next-line no-console
  console.info('Use "unauthorizedAdmin" role.');
  await authorize(t, browserTestUnauthorizedAdminUser);
});
