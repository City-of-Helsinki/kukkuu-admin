import type { User, UserManagerSettings } from 'oidc-client-ts';
import { UserManager, Log, WebStorageStateStore } from 'oidc-client-ts';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import authorizationService from './authorizationService';
import AppConfig from '../application/AppConfig';

const origin = window.location.origin;
export const API_TOKEN = 'apiToken';
export const REFRESH_TOKEN = 'refreshToken';

export type ApiTokenClientProps = {
  url: string;
  queryProps?: { permission: string; grant_type: string };
  audiences?: string[];
};

export class AuthService {
  private userManager: UserManager;
  private apiTokensClientConfig: ApiTokenClientProps;
  private authServerType: 'KEYCLOAK' | 'TUNNISTAMO';
  private audience: string;

  constructor() {
    this.authServerType = AppConfig.oidcServerType;
    this.audience = AppConfig.oidcAudience ?? AppConfig.oidcKukkuuApiClientId;

    const settings: UserManagerSettings = {
      loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      response_type: AppConfig.oidcReturnType,
      authority: AppConfig.oidcAuthority,
      client_id: AppConfig.oidcClientId,
      scope: AppConfig.oidcScope,
      redirect_uri: `${origin}/callback`,
      post_logout_redirect_uri: `${origin}/`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${origin}/silent_renew.html`,
      revokeTokensOnSignout: true,
    };

    if (!settings.automaticSilentRenew) {
      // eslint-disable-next-line no-console
      console.info('Auth token silent renew is disabled.');
    }

    if (process.env.NODE_ENV === 'development') {
      // Show oidc debugging info in the console only while developing
      Log.setLogger(console);
      Log.setLevel(Log.INFO);
    }

    // User Manager instance
    this.userManager = new UserManager(settings);

    // Api tokens client configuration
    this.apiTokensClientConfig = {
      url: AppConfig.oidcKukkuuApiTokensUrl,
      queryProps:
        this.authServerType === 'KEYCLOAK'
          ? {
              permission: '#access',
              grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
            }
          : undefined,
      audiences:
        this.authServerType === 'KEYCLOAK' && AppConfig.oidcAudience
          ? [AppConfig.oidcAudience]
          : undefined,
    };

    // Public methods
    this.getUser = this.getUser.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.endLogin = this.endLogin.bind(this);
    this.renewToken = this.renewToken.bind(this);
    this.logout = this.logout.bind(this);
    this.resetAuthState = this.resetAuthState.bind(this);
    this.fetchApiToken = this.fetchApiToken.bind(this);

    // Events
    this.userManager.events.addAccessTokenExpired(() => {
      this.logout();
    });

    this.userManager.events.addSilentRenewError(() => {
      this.logout();
    });

    this.userManager.events.addUserSignedOut(() => {
      this.resetAuthState();
    });

    this.userManager.events.addUserLoaded(async (user) => {
      await this.fetchApiToken(user);
      await authorizationService.fetchRole();
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public getToken(): string | null {
    return localStorage.getItem(API_TOKEN);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  public getUserStorageKey(): string {
    return `oidc.user:${AppConfig.oidcAuthority}:${AppConfig.oidcClientId}`;
  }

  public isAuthenticated() {
    const userKey = this.getUserStorageKey();
    const oidcStorage = localStorage.getItem(userKey);
    const apiTokens = this.getToken();

    return (
      !!oidcStorage && !!JSON.parse(oidcStorage).access_token && !!apiTokens
    );
  }

  public async login(path = '/'): Promise<void> {
    try {
      return this.userManager.signinRedirect({ url_state: path });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      if (error instanceof Error) {
        if (error.message !== 'Network Error') {
          Sentry.captureException(error);
        }
      }
    }
  }

  public async endLogin(): Promise<User> {
    // eslint-disable-next-line no-console
    console.info('Ending the login...');
    const user = await this.userManager.signinRedirectCallback();

    await this.fetchApiToken(user);
    await authorizationService.fetchRole();

    return user;
  }

  public async renewToken(): Promise<User | null> {
    // eslint-disable-next-line no-console
    console.info('Renewing the JWT token...');
    const user = await this.userManager.signinSilent();
    if (user) {
      localStorage.setItem(API_TOKEN, user.access_token);
      if (user.refresh_token) {
        localStorage.setItem(REFRESH_TOKEN, user.refresh_token);
      } else {
        localStorage.removeItem(REFRESH_TOKEN);
      }
    }
    return user;
  }

  public resetAuthState() {
    // eslint-disable-next-line no-console
    console.warn('Resetting the auth state...');
    localStorage.removeItem(API_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    projectService.clear();
    this.userManager.clearStaleState();
    authorizationService.clear();
  }

  public async logout(): Promise<void> {
    // eslint-disable-next-line no-console
    console.info('Logout...');
    this.resetAuthState();
    await this.userManager.signoutRedirect();
  }

  /**
   * Query the API tokens endpoint with the given access token.
   * @param accessToken The access token to use for the API tokens endpoint query.
   * @returns For Tunnistamo should return a dictionary with the API identifiers
   * as the keys and the API tokens as the values here as data (See [1]).
   * For Keycloak should return access_token, token_type, and optionally
   * expires_in, refresh_token and scope here as data (See [2, 3]).
   *
   * [1] Tunnistamo "Obtaining the API tokens":
   * https://github.com/City-of-Helsinki/tunnistamo/blob/r211109/tokens.rst#obtaining-the-api-tokens
   *
   * [2] OIDC 1.0 "Authentication > Token Endpoint > Successful Token Response":
   * https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
   *
   * [3] OAuth 2.0 "Issuing an Access Token > Successful Response":
   * https://www.rfc-editor.org/rfc/rfc6749.html#section-5.1
   */
  private async queryApiTokensEndpoint(accessToken: string) {
    return axios(this.apiTokensClientConfig.url, {
      method: 'post',
      baseURL: AppConfig.oidcAuthority,
      headers: {
        Authorization: `bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      data:
        this.authServerType === 'KEYCLOAK'
          ? {
              audience: this.audience,
              ...this.apiTokensClientConfig.queryProps,
            }
          : {},
    });
  }

  private async fetchApiToken(user: User): Promise<void> {
    const accessToken = user.access_token;
    try {
      const { data } = await this.queryApiTokensEndpoint(accessToken);
      const apiToken =
        this.authServerType === 'KEYCLOAK'
          ? data.access_token
          : data[AppConfig.oidcKukkuuApiClientId];

      // NOTE: Currently only supporting refresh tokens with Keycloak.
      // Tunnistamo does not return a refresh token from the API tokens
      // endpoint, but Keycloak does from the token endpoint.
      const refreshToken =
        (this.authServerType === 'KEYCLOAK' ? data.refresh_token : null) ??
        user.refresh_token;

      localStorage.setItem(API_TOKEN, apiToken);
      if (!refreshToken) {
        localStorage.removeItem(REFRESH_TOKEN);
      } else {
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch API token', error);
      Sentry.captureException(error);
    }
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
