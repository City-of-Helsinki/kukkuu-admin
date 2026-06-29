import type { Page } from '@playwright/test';

import BrowserTestJWTConfig from '../jwt/config';
import {
  generateTokenEndpointResponse,
  generateUserInfoEndpointResponse,
} from '../jwt/oidc';
import type {
  OIDCOpenIdConfigurationResponseType,
  OIDCUserProfileType,
} from '../jwt/types';
import { envUrl } from '../settings';

let cachedOidcConfig: OIDCOpenIdConfigurationResponseType | null = null;

async function getOidcConfig(): Promise<OIDCOpenIdConfigurationResponseType> {
  if (!cachedOidcConfig) {
    const response = await fetch(
      BrowserTestJWTConfig.oidcConfigurationEndpoint
    );
    cachedOidcConfig =
      (await response.json()) as OIDCOpenIdConfigurationResponseType;
  }
  return cachedOidcConfig;
}

/**
 * Install page.route handlers that mock the OIDC endpoints used by oidc-client-ts.
 * Replaces AuthServiceRequestInterceptor + KukkuuApiTestJwtBearerAuthorization from
 * browser-tests/utils/jwt/mocks/testJWTAuthRequests.ts.
 *
 * Must be called before page.goto() so that routes are in place when the app loads.
 */
export async function installOidcMock(
  page: Page,
  user: OIDCUserProfileType
): Promise<void> {
  const { authorization_endpoint, token_endpoint, userinfo_endpoint } =
    await getOidcConfig();

  // Intercept every request whose URL starts with the OIDC authority
  await page.route(`${BrowserTestJWTConfig.oidcAuthority}**`, async (route) => {
    const url = route.request().url().split('?')[0];

    if (url === authorization_endpoint) {
      // Redirect auth endpoint straight back to the app (bypasses the login UI)
      await route.fulfill({
        status: 307,
        headers: { Location: envUrl() },
      });
    } else if (url === token_endpoint) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(generateTokenEndpointResponse(user)),
      });
    } else if (url === userinfo_endpoint) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(generateUserInfoEndpointResponse(user)),
      });
    } else {
      // Let .well-known/openid-configuration and anything else pass through live
      await route.continue();
    }
  });
}
