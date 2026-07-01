import type { Page } from '@playwright/test';

import type { OIDCUserProfileType } from '../jwt/types';
import { installOidcMock } from './oidcMock';
import { buildStorageSeed } from './seedStorage';

/**
 * Set up OIDC route mocks and seed localStorage/sessionStorage so the app treats
 * the user as authenticated without going through the real OIDC login flow.
 *
 * Call this before page.goto() in beforeEach:
 *   await setupAuth(page, browserTestAdminUser);
 *   await page.goto(routes.eventsList());
 */
export async function setupAuth(
  page: Page,
  user: OIDCUserProfileType
): Promise<void> {
  await installOidcMock(page, user);

  const seed = await buildStorageSeed(user);

  // addInitScript runs before every navigation in this page context,
  // ensuring storage is populated before the app's own JS executes.
  await page.addInitScript(
    (data: {
      localStorage: Record<string, string>;
      sessionStorage: Record<string, string>;
    }) => {
      for (const [key, value] of Object.entries(data.localStorage)) {
        window.localStorage.setItem(key, value);
      }
      for (const [key, value] of Object.entries(data.sessionStorage)) {
        window.sessionStorage.setItem(key, value);
      }
    },
    seed
  );
}
