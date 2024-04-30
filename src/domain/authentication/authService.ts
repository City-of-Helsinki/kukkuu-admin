import type { User, UserManagerSettings } from 'oidc-client-ts';
import { UserManager, Log, WebStorageStateStore } from 'oidc-client-ts';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import projectService from '../projects/projectService';
import authorizationService from './authorizationService';
import AppConfig from '../application/AppConfig';

const origin = window.location.origin;
export const API_TOKEN = 'apiToken';

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
    this.authServerType = AppConfig.oidcServerType ?? 'TUNNISTAMO';
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
      // TODO: The silent renew support needs to be added to the React-admin authProvider as well.
      // More about this:
      // - https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
      // - https://marmelab.com/react-admin/addRefreshAuthToAuthProvider.html
      // - https://marmelab.com/react-admin/addRefreshAuthToDataProvider.html
      automaticSilentRenew: false,
      // silent_redirect_uri: `${origin}/silent_renew.html`,
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
      if (error instanceof Error) {
        if (error.message !== 'Network Error') {
          Sentry.captureException(error);
        }
      }
    }
  }

  public async endLogin(): Promise<User> {
    const user = await this.userManager.signinRedirectCallback();

    await this.fetchApiToken(user);
    await authorizationService.fetchRole();

    return user;
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public resetAuthState() {
    localStorage.removeItem(API_TOKEN);
    projectService.clear();
    this.userManager.clearStaleState();
    authorizationService.clear();
  }

  public async logout(): Promise<void> {
    this.resetAuthState();
    await this.userManager.signoutRedirect();
  }

  private async fetchApiToken(user: User): Promise<void> {
    const accessToken = user.access_token;
    try {
      const { data } = await axios(this.apiTokensClientConfig.url, {
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

      const apiToken =
        this.authServerType === 'KEYCLOAK'
          ? data.access_token
          : data[AppConfig.oidcKukkuuApiClientId];

      localStorage.setItem(API_TOKEN, apiToken);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch API token', error);
      Sentry.captureException(error);
    }
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
