import { test, expect } from '@playwright/test';

import { setupAuth } from './utils/auth/setupAuth';
import { browserTestUnauthorizedAdminUser } from './utils/jwt/users';
import { routes } from './pages/routes';
import { unauthorizedPage } from './pages/unauthorized';

test.describe('Unauthorized feature', () => {
  test.beforeEach(async ({ page }) => {
    await setupAuth(page, browserTestUnauthorizedAdminUser);
    await page.goto(routes.eventsList());
  });

  test('As a user without admin permissions I want to see an unauthorized page', async ({
    page,
  }) => {
    await page.waitForURL('**/unauthorized');
    await expect(unauthorizedPage(page).title).toBeVisible();
    await expect(unauthorizedPage(page).logoutButton).toBeVisible();
  });
});
