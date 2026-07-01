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

// Build the OIDC discovery payload from the known authority URL.
// Tunnistamo/Keycloak follows the standard path convention, so we can
// construct all endpoint URLs without a live network call.
function getOidcConfig(): OIDCOpenIdConfigurationResponseType {
  if (!cachedOidcConfig) {
    const authority = BrowserTestJWTConfig.oidcAuthority;
    const base = authority.endsWith('/') ? authority : `${authority}/`;
    const issuer = base.replace(/\/$/, '');
    cachedOidcConfig = {
      issuer,
      authorization_endpoint: `${base}protocol/openid-connect/auth`,
      token_endpoint: `${base}protocol/openid-connect/token`,
      userinfo_endpoint: `${base}protocol/openid-connect/userinfo`,
      end_session_endpoint: `${base}protocol/openid-connect/logout`,
    };
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
  const oidcConfig = getOidcConfig();
  const { authorization_endpoint, token_endpoint, userinfo_endpoint } =
    oidcConfig;
  const discoveryEndpoint = BrowserTestJWTConfig.oidcConfigurationEndpoint;

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
    } else if (url === discoveryEndpoint) {
      // Serve the discovery document from the mock — no live IdP request needed
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(oidcConfig),
      });
    } else {
      await route.continue();
    }
  });
}
