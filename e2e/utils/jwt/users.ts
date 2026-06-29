import BrowserTestJWTConfig from './config';
import type { OIDCUserProfileType } from './types';

/**
 * Administrator for every Kukkuu (year) project.
 * Has all the `ad_groups` in the JWT.
 */
export const browserTestAdminUser: OIDCUserProfileType = {
  sub: '8897f932-f386-412d-95f4-90177a2f9555',
  preferred_username: 'kukkuu-admin-ui-browser-test-admin-user',
  email: 'kukkuu-admin-ui-browser-test-admin@kummilapset.hel.fi',
  given_name: 'Test-admin',
  family_name: 'Browser-Test',
  ad_groups: [BrowserTestJWTConfig.browserTestADGroup],
};

/**
 * Unauthorized user who tries to act as an admin.
 * Has no `ad_groups` in the JWT.
 */
export const browserTestUnauthorizedAdminUser: OIDCUserProfileType = {
  sub: '361a2b6f-0c45-4803-b316-3b58ca893d9b',
  preferred_username: 'kukkuu-admin-ui-browser-test-unauthorized-admin-user',
  email: 'kukkuu-admin-ui-browser-test-unauthorized-admin@kummilapset.hel.fi',
  given_name: 'Wanna-be-admin',
  family_name: 'Browser-Test',
  ad_groups: [],
};
